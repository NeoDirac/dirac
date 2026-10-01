/**
 * Mathematical expression parsing and equivalence checking.
 *
 * Strategy (documented for reviewers):
 *  1. Normalize the input (unicode operators, decimal commas, superscripts).
 *  2. Tokenize + parse with a small recursive-descent parser into an AST.
 *  3. For equivalence, evaluate both expressions at a deterministic set of
 *     sample points and compare numerically ("probabilistic equivalence").
 *     Points where either expression is undefined (division by zero, sqrt of
 *     negatives, log of non-positives) are skipped; we require at least 4
 *     valid comparison points, trying progressively more sample rounds.
 *
 * This avoids `eval()` entirely and handles the equivalences this curriculum
 * needs: 2x+2x ≡ 4x, x/2 ≡ 0.5x, (x+1)^2 ≡ x^2+2x+1, sqrt(x)^2 ≡ x, etc.
 *
 * Conventions:
 *  - trig functions take radians; log = base 10; ln = natural log.
 *  - implicit multiplication is supported: 2x, 3(x+1), x(x-1), (x+1)(x-1).
 *  - decimal commas are accepted: "2,5x" ≡ "2.5x".
 */

export type Node =
  | { t: "num"; v: number }
  | { t: "var"; name: string }
  | { t: "fn"; name: string; arg: Node }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: Node; b: Node }
  | { t: "neg"; a: Node };

/* ------------------------------------------------------------------ */
/* Normalization                                                       */
/* ------------------------------------------------------------------ */

const SUPERSCRIPTS: Record<string, string> = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
  "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  "⁻": "-",
};

export function normalizeExpression(src: string): string {
  let s = src.trim();
  // unify unicode
  s = s
    .replace(/[×⋅∙·∗]/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–—]/g, "-")
    .replace(/，/g, ",");
  // superscript digits → ^n  (x² → x^(2), also handles x⁻¹)
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (m) => "^(" + [...m].map((c) => SUPERSCRIPTS[c]).join("") + ")");
  // decimal comma between digits: 2,5 → 2.5   (also 2,5e3)
  s = s.replace(/(\d),(\d)/g, "$1.$2");
  // leading decimal comma: ",5" → "0.5"
  s = s.replace(/^,(\d)/, "0.$1");
  // π and θ and common greek → names
  s = s.replace(/π/g, "pi").replace(/θ/g, "theta").replace(/α/g, "alpha").replace(/β/g, "beta");
  // collapse whitespace
  s = s.replace(/\s+/g, " ");
  return s;
}

/* ------------------------------------------------------------------ */
/* Tokenizer                                                           */
/* ------------------------------------------------------------------ */

type Tok =
  | { k: "num"; v: number }
  | { k: "id"; v: string }
  | { k: "op"; v: string };

const FUNCS = new Set(["sqrt", "abs", "sin", "cos", "tan", "ln", "log", "exp", "asin", "acos", "atan"]);
const CONSTS = new Set(["pi", "e", "tau"]);

export class ExpressionError extends Error {}

function tokenize(src: string): Tok[] {
  const s = normalizeExpression(src);
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i++; continue; }
    if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(s[i + 1] ?? ""))) {
      const m = /^[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(s.slice(i));
      if (!m) throw new ExpressionError(`Bad number at position ${i}`);
      toks.push({ k: "num", v: parseFloat(m[0]) });
      i += m[0].length;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      const m = /^[a-zA-Z]+/.exec(s.slice(i))!;
      toks.push({ k: "id", v: m[0] });
      i += m[0].length;
      continue;
    }
    if ("+-*/^(),".includes(c)) {
      if (c === "*" && s[i + 1] === "*") {
        toks.push({ k: "op", v: "^" });
        i += 2;
        continue;
      }
      toks.push({ k: "op", v: c });
      i++;
      continue;
    }
    throw new ExpressionError(`Unexpected character '${c}'`);
  }
  return toks;
}

/* ------------------------------------------------------------------ */
/* Parser (recursive descent)                                          */
/* ------------------------------------------------------------------ */

class Parser {
  private toks: Tok[];
  private pos = 0;

  constructor(src: string) {
    this.toks = tokenize(src);
  }

  private peek(): Tok | undefined {
    return this.toks[this.pos];
  }

  private eatOp(v: string): boolean {
    const t = this.peek();
    if (t && t.k === "op" && t.v === v) {
      this.pos++;
      return true;
    }
    return false;
  }

  private expectOp(v: string): void {
    if (!this.eatOp(v)) throw new ExpressionError(`Expected '${v}'`);
  }

  parse(): Node {
    const n = this.expr();
    if (this.pos < this.toks.length) throw new ExpressionError("Unexpected trailing input");
    return n;
  }

  private expr(): Node {
    let a = this.term();
    for (;;) {
      if (this.eatOp("+")) a = { t: "bin", op: "+", a, b: this.term() };
      else if (this.eatOp("-")) a = { t: "bin", op: "-", a, b: this.term() };
      else return a;
    }
  }

  private term(): Node {
    let a = this.unary();
    for (;;) {
      if (this.eatOp("*")) a = { t: "bin", op: "*", a, b: this.unary() };
      else if (this.eatOp("/")) a = { t: "bin", op: "/", a, b: this.unary() };
      else if (this.startsPrimary()) a = { t: "bin", op: "*", a, b: this.unary() }; // implicit multiplication
      else return a;
    }
  }

  /** does a new primary start here (for implicit multiplication)? */
  private startsPrimary(): boolean {
    const t = this.peek();
    if (!t) return false;
    if (t.k === "num" || t.k === "id") return true;
    return t.k === "op" && t.v === "(";
  }

  private unary(): Node {
    if (this.eatOp("-")) return { t: "neg", a: this.unary() };
    if (this.eatOp("+")) return this.unary();
    return this.power();
  }

  private power(): Node {
    const base = this.atom();
    if (this.eatOp("^")) {
      const exp = this.unary(); // right associative, allows 2^-3
      return { t: "bin", op: "^", a: base, b: exp };
    }
    return base;
  }

  private atom(): Node {
    const t = this.peek();
    if (!t) throw new ExpressionError("Unexpected end of expression");
    if (t.k === "num") {
      this.pos++;
      return { t: "num", v: t.v };
    }
    if (t.k === "id") {
      this.pos++;
      const next = this.peek();
      if (next && next.k === "op" && next.v === "(" && FUNCS.has(t.v)) {
        this.pos++; // (
        const arg = this.expr();
        this.expectOp(")");
        return { t: "fn", name: t.v, arg };
      }
      if (FUNCS.has(t.v)) throw new ExpressionError(`Function '${t.v}' needs parentheses`);
      return { t: "var", name: t.v };
    }
    if (t.k === "op" && t.v === "(") {
      this.pos++;
      const n = this.expr();
      this.expectOp(")");
      return n;
    }
    throw new ExpressionError("Unexpected token");
  }
}

export function parseExpression(src: string): Node {
  if (!src.trim()) throw new ExpressionError("Empty expression");
  return new Parser(src).parse();
}

/* ------------------------------------------------------------------ */
/* Evaluation                                                          */
/* ------------------------------------------------------------------ */

export function evalNode(
  node: Node,
  env: Record<string, number>,
): number {
  switch (node.t) {
    case "num":
      return node.v;
    case "var": {
      if (Object.prototype.hasOwnProperty.call(env, node.name)) return env[node.name];
      if (node.name === "pi") return Math.PI;
      if (node.name === "tau") return 2 * Math.PI;
      if (node.name === "e") return Math.E;
      throw new ExpressionError(`Unknown variable '${node.name}'`);
    }
    case "neg":
      return -evalNode(node.a, env);
    case "fn": {
      const x = evalNode(node.arg, env);
      switch (node.name) {
        case "sqrt": return Math.sqrt(x);
        case "abs": return Math.abs(x);
        case "sin": return Math.sin(x);
        case "cos": return Math.cos(x);
        case "tan": return Math.tan(x);
        case "asin": return Math.asin(x);
        case "acos": return Math.acos(x);
        case "atan": return Math.atan(x);
        case "ln": return Math.log(x);
        case "log": return Math.log10(x);
        case "exp": return Math.exp(x);
        default: throw new ExpressionError(`Unknown function '${node.name}'`);
      }
    }
    case "bin": {
      const a = evalNode(node.a, env);
      const b = evalNode(node.b, env);
      switch (node.op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        case "^":
          return Math.pow(a, b);
      }
    }
  }
}

export function collectVars(node: Node, out = new Set<string>()): Set<string> {
  switch (node.t) {
    case "var":
      if (!CONSTS.has(node.name)) out.add(node.name);
      break;
    case "neg":
      collectVars(node.a, out);
      break;
    case "fn":
      collectVars(node.arg, out);
      break;
    case "bin":
      collectVars(node.a, out);
      collectVars(node.b, out);
      break;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Equivalence by sampling                                             */
/* ------------------------------------------------------------------ */

/** deterministic sample rounds — mixed signs, then positives, then larger */
const SAMPLE_ROUNDS: number[][] = [
  [-2.31, -1.57, -0.83, -0.32, 0.47, 1.19, 2.03, 3.41],
  [0.21, 0.57, 0.93, 1.35, 1.78, 2.46, 3.15, 4.72],
  [1.03, 1.47, 2.11, 3.37, 5.19, 7.73, 11.1, 19.7],
  [-12.3, -7.19, -3.87, -1.13, 0.07, 0.29, 6.41, 13.9],
];

function close(a: number, b: number): boolean {
  return Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(b));
}

/**
 * Checks whether `candidate` is mathematically equivalent to ANY of the
 * `accepted` expressions.
 * @returns 'equivalent' | 'different' | 'invalid' (parse error)
 */
export function checkExpressionEquivalent(
  candidate: string,
  accepted: readonly string[],
): "equivalent" | "different" | "invalid" {
  let candNode: Node;
  let accNodes: Node[];
  try {
    candNode = parseExpression(candidate);
    accNodes = accepted.map(parseExpression);
  } catch {
    return "invalid";
  }

  // variable sets must match: candidate vars ⊆ accepted vars
  const candVars = collectVars(candNode);
  const accVars = new Set<string>();
  for (const a of accNodes) collectVars(a, accVars);
  for (const v of candVars) {
    if (!accVars.has(v)) return "different";
  }
  const vars = [...accVars];

  // constant expressions: direct evaluation
  if (vars.length === 0) {
    try {
      const cv = evalNode(candNode, {});
      return accNodes.some((a) => close(evalNode(a, {}), cv)) ? "equivalent" : "different";
    } catch {
      return "invalid";
    }
  }

  // build env combinations
  const envs: Record<string, number>[] = [];
  for (const round of SAMPLE_ROUNDS) {
    for (const base of round) {
      const env: Record<string, number> = {};
      let k = 0;
      for (const v of vars) {
        const delta = ((Math.abs(base * 37) + k * 11) % 13) / 26 - 0.25; // small deterministic offset
        env[v] = base + delta;
        k++;
      }
      envs.push(env);
    }
  }

  let compared = 0;
  for (const env of envs) {
    let accVals: number[];
    let candVal: number;
    try {
      candVal = evalNode(candNode, env);
      accVals = accNodes.map((a) => evalNode(a, env));
    } catch {
      continue;
    }
    if (!Number.isFinite(candVal)) continue;
    const finiteAcc = accVals.filter((v) => Number.isFinite(v));
    if (finiteAcc.length === 0) continue;
    compared++;
    if (!finiteAcc.some((av) => close(av, candVal))) return "different";
    if (compared >= 12) break; // enough evidence
  }

  if (compared < 4) {
    // not enough valid points — denser deterministic sweep (helps sqrt/ln/log domains)
    const probes = [0.11, 0.23, 0.37, 0.52, 0.68, 0.81, 0.97, 1.13, 1.31, 1.52, 1.77, 2.04];
    let c2 = 0;
    for (const base of probes) {
      const env: Record<string, number> = {};
      let k = 0;
      for (const v of vars) {
        env[v] = base + ((k * 7) % 5) * 0.13;
        k++;
      }
      let cv: number;
      let avs: number[];
      try {
        cv = evalNode(candNode, env);
        avs = accNodes.map((a) => evalNode(a, env));
      } catch {
        continue;
      }
      if (!Number.isFinite(cv)) continue;
      const fa = avs.filter((n) => Number.isFinite(n));
      if (fa.length === 0) continue;
      c2++;
      if (!fa.some((av) => close(av, cv))) return "different";
      if (c2 >= 6) return "equivalent";
    }
    if (c2 >= 4) return "equivalent";
    return "invalid";
  }
  return "equivalent";
}

/** Evaluate a closed-form (no variables) expression string. Throws on error. */
export function evaluateConstant(src: string): number {
  const node = parseExpression(src);
  const vars = collectVars(node);
  if (vars.size > 0) throw new ExpressionError("Variables not allowed here");
  const v = evalNode(node, {});
  if (!Number.isFinite(v)) throw new ExpressionError("Not a finite number");
  return v;
}
