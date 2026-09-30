"use client";

/**
 * Parameterized SVG diagrams for graphical problems.
 * All diagrams are generated from problem data (no static images) and adapt
 * to dark mode via CSS variables.
 */

import { useMemo } from "react";
import type { DiagramSpec } from "@/lib/types";
import { parseExpression, evalNode } from "@/lib/validation/expression";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const COLOR = {
  primary: "var(--diagram-primary)",
  secondary: "var(--diagram-secondary)",
  muted: "var(--diagram-muted)",
} as const;

function colorOf(c: "primary" | "secondary" | "muted" | undefined): string {
  return COLOR[c ?? "primary"];
}

function fmt(n: number, lang: "es" | "en"): string {
  const s = Math.abs(n) < 1e-9 ? "0" : String(Math.round(n * 100) / 100);
  return lang === "es" ? s.replace(".", ",") : s;
}

/** nice tick step for a given range targeting ~8 ticks */
function niceStep(range: number): number {
  const rough = range / 8;
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  if (norm < 1.5) return 1 * pow;
  if (norm < 3.5) return 2 * pow;
  if (norm < 7.5) return 5 * pow;
  return 10 * pow;
}

/* ================================================================== */
/* Function graph                                                      */
/* ================================================================== */

function FunctionGraph({ spec }: { spec: Extract<DiagramSpec, { kind: "function-graph" }> }) {
  const { lang } = useI18n();
  const W = 560;
  const H = 360;
  const M = 38; // margin
  const xMin = spec.xMin;
  const xMax = spec.xMax;
  const yMin = spec.yMin;
  const yMax = spec.yMax;
  const sx = (x: number) => M + ((x - xMin) / (xMax - xMin)) * (W - 2 * M);
  const sy = (y: number) => H - M - ((y - yMin) / (yMax - yMin)) * (H - 2 * M);

  const grid: React.ReactNode[] = [];
  if (spec.showGrid !== false) {
    const stepX = niceStep(xMax - xMin);
    for (let x = Math.ceil(xMin / stepX) * stepX; x <= xMax + 1e-9; x += stepX) {
      grid.push(
        <line key={`gx${x}`} x1={sx(x)} y1={M} x2={sx(x)} y2={H - M} stroke="var(--diagram-grid)" strokeWidth={1} />,
      );
    }
    const stepY = niceStep(yMax - yMin);
    for (let y = Math.ceil(yMin / stepY) * stepY; y <= yMax + 1e-9; y += stepY) {
      grid.push(
        <line key={`gy${y}`} x1={M} y1={sy(y)} x2={W - M} y2={sy(y)} stroke="var(--diagram-grid)" strokeWidth={1} />,
      );
    }
  }

  // axes: at zero when visible, else at the border
  const ax = xMin <= 0 && xMax >= 0 ? sx(0) : xMin < 0 ? W - M : M;
  const ay = yMin <= 0 && yMax >= 0 ? sy(0) : yMin < 0 ? M : H - M;

  const ticks: React.ReactNode[] = [];
  const stepX = niceStep(xMax - xMin);
  for (let x = Math.ceil(xMin / stepX) * stepX; x <= xMax + 1e-9; x += stepX) {
    if (Math.abs(x) < 1e-9 && ax === sx(0)) continue;
    ticks.push(
      <text key={`tx${x}`} x={sx(x)} y={ay + 16} textAnchor="middle" fontSize={11} fill="var(--muted-foreground)">
        {fmt(x, lang)}
      </text>,
    );
  }
  const stepY = niceStep(yMax - yMin);
  for (let y = Math.ceil(yMin / stepY) * stepY; y <= yMax + 1e-9; y += stepY) {
    if (Math.abs(y) < 1e-9 && ay === sy(0)) continue;
    ticks.push(
      <text key={`ty${y}`} x={ax - 8} y={sy(y) + 4} textAnchor="end" fontSize={11} fill="var(--muted-foreground)">
        {fmt(y, lang)}
      </text>,
    );
  }

  // curves
  const curves = spec.curves.map((c, ci) => {
    let ast;
    try {
      ast = parseExpression(c.fn);
    } catch {
      return null;
    }
    const N = 180;
    let d = "";
    let pen = false;
    for (let i = 0; i <= N; i++) {
      const x = xMin + ((xMax - xMin) * i) / N;
      let y: number;
      try {
        y = evalNode(ast, { x });
      } catch {
        y = NaN;
      }
      if (!Number.isFinite(y) || y < yMin - (yMax - yMin) * 0.6 || y > yMax + (yMax - yMin) * 0.6) {
        pen = false;
        continue;
      }
      const px = sx(x);
      const py = sy(Math.max(yMin, Math.min(yMax, y)));
      d += `${pen ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`;
      pen = true;
    }
    return (
      <path
        key={`c${ci}`}
        d={d}
        fill="none"
        stroke={colorOf(c.color)}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeDasharray={c.dashed ? "6 5" : undefined}
      />
    );
  });

  const points = (spec.points ?? []).map((p, i) => (
    <g key={`p${i}`}>
      <circle cx={sx(p.x)} cy={sy(p.y)} r={4.5} fill={colorOf("primary")} stroke="var(--card)" strokeWidth={2} />
      {p.label ? (
        <text
          x={sx(p.x) + 9}
          y={sy(p.y) - 8}
          fontSize={12.5}
          fill="var(--foreground)"
          fontWeight={500}
        >
          {p.label.replace(".", lang === "es" ? "," : ".")}
        </text>
      ) : null}
    </g>
  ));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
      {grid}
      <line x1={M} y1={ay} x2={W - M + 6} y2={ay} stroke="var(--diagram-axis)" strokeWidth={1.6} />
      <line x1={ax} y1={H - M} x2={ax} y2={M - 6} stroke="var(--diagram-axis)" strokeWidth={1.6} />
      <path d={`M${W - M + 6},${ay} l-7,-3.5 l0,7 z`} fill="var(--diagram-axis)" />
      <path d={`M${ax},${M - 6} l-3.5,7 l7,0 z`} fill="var(--diagram-axis)" />
      {ticks}
      {curves}
      {points}
      {spec.xLabel ? (
        <text x={W - M + 2} y={ay + 26} fontSize={12} fontStyle="italic" fill="var(--muted-foreground)" textAnchor="end">
          {spec.xLabel}
        </text>
      ) : null}
      {spec.yLabel ? (
        <text x={ax + 8} y={M - 12} fontSize={12} fontStyle="italic" fill="var(--muted-foreground)">
          {spec.yLabel}
        </text>
      ) : null}
    </svg>
  );
}

/* ================================================================== */
/* Vectors                                                            */
/* ================================================================== */

function Vectors({ spec }: { spec: Extract<DiagramSpec, { kind: "vectors" }> }) {
  const { lang } = useI18n();
  const W = 480;
  const H = 400;
  const M = 40;
  const xMin = spec.xMin;
  const xMax = spec.xMax;
  const yMin = spec.yMin;
  const yMax = spec.yMax;
  const sx = (x: number) => M + ((x - xMin) / (xMax - xMin)) * (W - 2 * M);
  const sy = (y: number) => H - M - ((y - yMin) / (yMax - yMin)) * (H - 2 * M);

  const grid: React.ReactNode[] = [];
  if (spec.showGrid) {
    const stepX = Math.max(1, niceStep(xMax - xMin));
    for (let x = Math.ceil(xMin / stepX) * stepX; x <= xMax + 1e-9; x += stepX) {
      grid.push(<line key={`gx${x}`} x1={sx(x)} y1={M} x2={sx(x)} y2={H - M} stroke="var(--diagram-grid)" strokeWidth={1} />);
    }
    const stepY = Math.max(1, niceStep(yMax - yMin));
    for (let y = Math.ceil(yMin / stepY) * stepY; y <= yMax + 1e-9; y += stepY) {
      grid.push(<line key={`gy${y}`} x1={M} y1={sy(y)} x2={W - M} y2={sy(y)} stroke="var(--diagram-grid)" strokeWidth={1} />);
    }
  }
  const ax = xMin <= 0 && xMax >= 0 ? sx(0) : xMin < 0 ? W - M : M;
  const ay = yMin <= 0 && yMax >= 0 ? sy(0) : yMin < 0 ? M : H - M;

  const arrows = spec.vectors.map((v, i) => {
    const from = v.from ?? { x: 0, y: 0 };
    const x1 = sx(from.x);
    const y1 = sy(from.y);
    const x2 = sx(from.x + v.x);
    const y2 = sy(from.y + v.y);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < 2) return null;
    const ux = dx / len;
    const uy = dy / len;
    const head = 11;
    const bx = x2 - ux * head;
    const by = y2 - uy * head;
    const color = colorOf(v.color);
    const labelX = x2 + ux * 14;
    const labelY = y2 + uy * 14 + 4;
    const comps: React.ReactNode[] = [];
    if (spec.showComponents) {
      comps.push(
        <line key={`cx${i}`} x1={x2} y1={y2} x2={x2} y2={ay} stroke={color} strokeWidth={1.2} strokeDasharray="4 4" opacity={0.6} />,
        <line key={`cy${i}`} x1={x2} y1={y2} x2={ax} y2={y2} stroke={color} strokeWidth={1.2} strokeDasharray="4 4" opacity={0.6} />,
      );
    }
    return (
      <g key={`v${i}`}>
        <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={2.6} strokeLinecap="round" />
        <path
          d={`M${x2},${y2} L${bx + uy * 4.5},${by - ux * 4.5} L${bx - uy * 4.5},${by + ux * 4.5} Z`}
          fill={color}
        />
        {comps}
        {v.label ? (
          <text x={labelX} y={labelY} fontSize={13.5} fontWeight={600} fill={color} textAnchor="middle">
            {v.label}
          </text>
        ) : null}
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
      {grid}
      <line x1={M} y1={ay} x2={W - M + 6} y2={ay} stroke="var(--diagram-axis)" strokeWidth={1.6} />
      <line x1={ax} y1={H - M} x2={ax} y2={M - 6} stroke="var(--diagram-axis)" strokeWidth={1.6} />
      <path d={`M${W - M + 6},${ay} l-7,-3.5 l0,7 z`} fill="var(--diagram-axis)" />
      <path d={`M${ax},${M - 6} l-3.5,7 l7,0 z`} fill="var(--diagram-axis)" />
      {arrows}
      {spec.xLabel ? (
        <text x={W - M} y={ay + 22} fontSize={12} fontStyle="italic" fill="var(--muted-foreground)" textAnchor="end">
          {spec.xLabel} ({lang === "es" ? "unidades" : "units"})
        </text>
      ) : null}
      {spec.yLabel ? (
        <text x={ax + 8} y={M - 12} fontSize={12} fontStyle="italic" fill="var(--muted-foreground)">
          {spec.yLabel}
        </text>
      ) : null}
    </svg>
  );
}

/* ================================================================== */
/* Projectile trajectory                                               */
/* ================================================================== */

function Projectile({ spec }: { spec: Extract<DiagramSpec, { kind: "projectile" }> }) {
  const { lang } = useI18n();
  const g = spec.g ?? 9.8;
  const h0 = spec.h0 ?? 0;
  const rad = (spec.angleDeg * Math.PI) / 180;
  const vx = spec.v0 * Math.cos(rad);
  const vy = spec.v0 * Math.sin(rad);
  const tFlight = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
  const R = vx * tFlight;
  const Hmax = h0 + (vy * vy) / (2 * g);

  const W = 520;
  const H = 340;
  const M = 42;
  const sx = (x: number) => M + (x / Math.max(R, 1)) * (W - 2 * M);
  const sy = (y: number) => H - M - (y / Math.max(Hmax, 1)) * (H - 2 * M - 12);

  const groundY = H - M;
  const N = 100;
  let d = `M${sx(0)},${sy(h0)}`;
  for (let i = 1; i <= N; i++) {
    const t = (tFlight * i) / N;
    const x = vx * t;
    const y = h0 + vy * t - 0.5 * g * t * t;
    d += `L${sx(x).toFixed(1)},${sy(y).toFixed(1)}`;
  }

  // launch velocity arrow
  const arrowLen = 52;
  const ax2 = sx(0) + arrowLen * Math.cos(rad);
  const ay2 = sy(h0) - arrowLen * Math.sin(rad);
  const ux = Math.cos(rad);
  const uy = -Math.sin(rad);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
      {/* ground */}
      <line x1={M - 10} y1={groundY} x2={W - M + 10} y2={groundY} stroke="var(--diagram-axis)" strokeWidth={2} />
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={i}
          x1={M - 8 + i * ((W - 2 * M + 16) / 13)}
          y1={groundY}
          x2={M - 14 + i * ((W - 2 * M + 16) / 13)}
          y2={groundY + 7}
          stroke="var(--diagram-grid)"
          strokeWidth={1.4}
        />
      ))}
      {/* trajectory */}
      <path d={d} fill="none" stroke="var(--diagram-primary)" strokeWidth={2.4} strokeLinecap="round" />
      {/* apex */}
      {spec.showAnnotations ? (
        <g>
          <circle cx={sx(R / 2)} cy={sy(Hmax)} r={3.6} fill="var(--diagram-secondary)" />
          <line x1={sx(R / 2)} y1={sy(Hmax)} x2={sx(R / 2)} y2={groundY} stroke="var(--diagram-secondary)" strokeDasharray="4 4" strokeWidth={1.2} />
          <text x={sx(R / 2) + 6} y={sy(Hmax) - 8} fontSize={12.5} fill="var(--diagram-secondary)" fontWeight={500}>
            H = {fmt(Hmax, lang)} m
          </text>
          <line x1={sx(R)} y1={sy(0)} x2={sx(R)} y2={groundY} stroke="var(--diagram-secondary)" strokeDasharray="4 4" strokeWidth={1.2} />
          <text x={sx(R) - 6} y={groundY - 10} fontSize={12.5} fill="var(--diagram-secondary)" fontWeight={500} textAnchor="end">
            R ≈ {fmt(Math.round(R * 10) / 10, lang)} m
          </text>
        </g>
      ) : null}
      {/* velocity arrow */}
      <line x1={sx(0)} y1={sy(h0)} x2={ax2 - ux * 8} y2={ay2 - uy * 8} stroke="var(--diagram-primary)" strokeWidth={2.6} strokeLinecap="round" />
      <path
        d={`M${ax2},${ay2} L${ax2 - ux * 11 + -uy * 4.5},${ay2 - uy * 11 + ux * 4.5} L${ax2 - ux * 11 - -uy * 4.5},${ay2 - uy * 11 - ux * 4.5} Z`}
        fill="var(--diagram-primary)"
      />
      <text x={ax2 + ux * 10 + 4} y={ay2 + uy * 10} fontSize={13} fontWeight={600} fill="var(--diagram-primary)">
        v₀ = {fmt(spec.v0, lang)} m/s
      </text>
      {/* angle arc */}
      <path
        d={`M${sx(0) + 26},${sy(h0)} A26,26 0 0 0 ${sx(0) + 26 * Math.cos(rad)},${sy(h0) - 26 * Math.sin(rad)}`}
        fill="none"
        stroke="var(--diagram-muted)"
        strokeWidth={1.4}
      />
      <text x={sx(0) + 34} y={sy(h0) - 12} fontSize={12} fill="var(--diagram-muted)">
        {spec.angleDeg}°
      </text>
    </svg>
  );
}

/* ================================================================== */
/* Unit circle                                                         */
/* ================================================================== */

function UnitCircle({ spec }: { spec: Extract<DiagramSpec, { kind: "unit-circle" }> }) {
  const { lang } = useI18n();
  const W = 360;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;
  const r = 120;
  const rad = (spec.angleDeg * Math.PI) / 180;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-w-[320px] mx-auto" role="presentation">
      <line x1={20} y1={cy} x2={W - 20} y2={cy} stroke="var(--diagram-axis)" strokeWidth={1.4} />
      <line x1={cx} y1={H - 20} x2={cx} y2={20} stroke="var(--diagram-axis)" strokeWidth={1.4} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--diagram-muted)" strokeWidth={1.8} />
      <circle cx={cx + r} cy={cy} r={2.5} fill="var(--diagram-muted)" />
      {/* angle arc */}
      <path
        d={`M${cx + 34},${cy} A34,34 0 0 ${spec.angleDeg > 180 ? 1 : 0} ${cx + 34 * Math.cos(rad)},${cy - 34 * Math.sin(rad)}`}
        fill="none"
        stroke="var(--diagram-secondary)"
        strokeWidth={1.8}
      />
      {/* ray */}
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="var(--diagram-primary)" strokeWidth={2.4} />
      {/* projections */}
      {spec.showPoint ? (
        <g>
          <line x1={px} y1={py} x2={px} y2={cy} stroke="var(--diagram-secondary)" strokeDasharray="4 4" strokeWidth={1.3} />
          <line x1={px} y1={py} x2={cx} y2={py} stroke="var(--diagram-secondary)" strokeDasharray="4 4" strokeWidth={1.3} />
        </g>
      ) : null}
      <circle cx={px} cy={py} r={5} fill="var(--diagram-primary)" stroke="var(--card)" strokeWidth={2} />
      {spec.showPoint ? (
        <text x={px + (Math.cos(rad) >= 0 ? 10 : -10)} y={py - 10} fontSize={13} fontWeight={600} fill="var(--foreground)" textAnchor={Math.cos(rad) >= 0 ? "start" : "end"}>
          ({fmt(Math.round(Math.cos(rad) * 1000) / 1000, lang)}, {fmt(Math.round(Math.sin(rad) * 1000) / 1000, lang)})
        </text>
      ) : null}
      <text x={cx + 44} y={cy - 14} fontSize={13.5} fontWeight={600} fill="var(--diagram-secondary)">
        {spec.angleLabel ?? `θ = ${spec.angleDeg}°`}
      </text>
      <text x={W - 34} y={cy - 8} fontSize={12} fontStyle="italic" fill="var(--muted-foreground)">x</text>
      <text x={cx + 8} y={26} fontSize={12} fontStyle="italic" fill="var(--muted-foreground)">y</text>
    </svg>
  );
}

/* ================================================================== */
/* Right triangle                                                      */
/* ================================================================== */

function RightTriangle({ spec }: { spec: Extract<DiagramSpec, { kind: "right-triangle" }> }) {
  const W = 420;
  const H = 300;
  const Ax = 60;
  const Ay = H - 50; // bottom-left, right angle
  const Bx = W - 60;
  const By = H - 50; // bottom-right, marked angle θ
  const Cx = 60;
  const Cy = 50; // top-left

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
      <polygon points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`} fill="none" stroke="var(--diagram-primary)" strokeWidth={2.4} strokeLinejoin="round" />
      {/* right angle */}
      <path d={`M${Ax},${Ay - 16} L${Ax + 16},${Ay - 16} L${Ax + 16},${Ay}`} fill="none" stroke="var(--diagram-muted)" strokeWidth={1.6} />
      {/* angle arc at B */}
      <path
        d={`M${Bx - 30},${By} A30,30 0 0 1 ${Bx - 30 * Math.cos(Math.atan2(By - Cy, Bx - Cx))},${By - 30 * Math.sin(Math.atan2(By - Cy, Bx - Cx))}`}
        fill="none"
        stroke="var(--diagram-secondary)"
        strokeWidth={1.8}
      />
      <text x={Bx - 42} y={By - 14} fontSize={13.5} fontWeight={600} fill="var(--diagram-secondary)">
        {spec.angleLabel ?? "θ"}
      </text>
      {/* side labels */}
      <text x={(Ax + Bx) / 2} y={By + 26} fontSize={14} textAnchor="middle" fill="var(--foreground)" fontWeight={500}>
        {spec.aLabel}
      </text>
      <text x={Ax - 14} y={(Ay + Cy) / 2} fontSize={14} textAnchor="end" fill="var(--foreground)" fontWeight={500} dominantBaseline="middle">
        {spec.bLabel}
      </text>
      <text
        x={(Bx + Cx) / 2 + 18}
        y={(By + Cy) / 2 - 12}
        fontSize={14}
        fill="var(--foreground)"
        fontWeight={500}
      >
        {spec.cLabel}
      </text>
    </svg>
  );
}

/* ================================================================== */
/* Free-body diagram                                                   */
/* ================================================================== */

function FreeBody({ spec }: { spec: Extract<DiagramSpec, { kind: "free-body" }> }) {
  const W = 440;
  const H = 320;
  const incline = spec.inclineDeg ?? 0;
  const rad = (incline * Math.PI) / 180;
  // incline surface: rises to the right
  const gx1 = 30;
  const gy1 = H - 50;
  const gx2 = W - 30;
  const gy2 = H - 50 - (W - 60) * Math.tan(rad);
  // box center placed on the surface
  const t = 0.5;
  const cx = gx1 + (gx2 - gx1) * t;
  const cy = gy1 + (gy2 - gy1) * t - 34;

  const boxSize = 58;

  const arrows = spec.forces.map((f, i) => {
    const len = 78;
    const mag = Math.hypot(f.dx, f.dy) || 1;
    const ux = f.dx / mag;
    const uy = f.dy / mag;
    const x2 = cx + ux * len;
    const y2 = cy + uy * len;
    const color = colorOf(f.color);
    const head = 10;
    const bx = x2 - ux * head;
    const by = y2 - uy * head;
    return (
      <g key={i}>
        <line x1={cx} y1={cy} x2={bx} y2={by} stroke={color} strokeWidth={2.6} strokeLinecap="round" />
        <path d={`M${x2},${y2} L${bx + uy * 4},${by - ux * 4} L${bx - uy * 4},${by + ux * 4} Z`} fill={color} />
        <text x={x2 + ux * 14} y={y2 + uy * 14 + 4} fontSize={13} fontWeight={600} fill={color} textAnchor="middle">
          {f.label}
        </text>
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
      <line x1={gx1} y1={gy1} x2={gx2} y2={gy2} stroke="var(--diagram-axis)" strokeWidth={2.2} />
      {incline > 0 ? (
        <text x={gx1 + 16} y={gy1 - 8 - 10} fontSize={12} fill="var(--muted-foreground)">
          {incline}°
        </text>
      ) : null}
      <g transform={`translate(${cx},${cy}) rotate(${incline})`}>
        <rect
          x={-boxSize / 2}
          y={-boxSize / 2}
          width={boxSize}
          height={boxSize}
          fill="color-mix(in oklch, var(--diagram-primary) 12%, var(--card))"
          stroke="var(--diagram-primary)"
          strokeWidth={2}
          rx={4}
        />
        <text x={0} y={5} fontSize={13} textAnchor="middle" fill="var(--foreground)" fontWeight={600}>
          {spec.massLabel ?? "m"}
        </text>
      </g>
      {arrows}
    </svg>
  );
}

/* ================================================================== */
/* Circuit schematic                                                   */
/* ================================================================== */

function Circuit({ spec }: { spec: Extract<DiagramSpec, { kind: "circuit" }> }) {
  const n = spec.resistors.length;
  const W = 520;
  const H = spec.mode === "parallel" ? 300 : 260;
  const L = 70; // left wire x
  const R = 450; // right wire x
  const T = 70; // top wire y
  const B = H - 60; // bottom wire y
  const wire = "var(--diagram-axis)";

  const resistorBox = (x: number, y: number, horizontal: boolean, label: string) => {
    const bw = 54;
    const bh = 22;
    const rx = horizontal ? x - bw / 2 : x - bh / 2;
    const ry = horizontal ? y - bh / 2 : y - bw / 2;
    return (
      <g key={label + x + y}>
        <rect
          x={rx}
          y={ry}
          width={horizontal ? bw : bh}
          height={horizontal ? bh : bw}
          rx={3}
          fill="color-mix(in oklch, var(--diagram-primary) 12%, var(--card))"
          stroke="var(--diagram-primary)"
          strokeWidth={2}
        />
        <text
          x={horizontal ? x : x + 14}
          y={horizontal ? y - bh / 2 - 8 : y}
          fontSize={13}
          fontWeight={500}
          fill="var(--foreground)"
          textAnchor={horizontal ? "middle" : "start"}
          dominantBaseline={horizontal ? "auto" : "middle"}
        >
          {label}
        </text>
      </g>
    );
  };

  if (spec.mode === "series") {
    // battery on the left wire, resistors in series on the top wire
    const slots = Array.from({ length: n }, (_, i) => L + ((R - L) * (i + 1)) / (n + 1));
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
        {/* loop */}
        <polyline
          points={`${L},${B} ${L},${T} ${R},${T} ${R},${B} ${L},${B}`}
          fill="none"
          stroke={wire}
          strokeWidth={2}
        />
        {/* battery (gap on left wire, two-plate symbol) */}
        <line x1={L - 16} y1={B / 2 + 16} x2={L + 16} y2={B / 2 + 16} stroke={wire} strokeWidth={3} />
        <line x1={L - 7} y1={B / 2 + 26} x2={L + 7} y2={B / 2 + 26} stroke={wire} strokeWidth={3} />
        <line x1={L} y1={B / 2 - 34} x2={L} y2={B / 2 + 16} stroke={wire} strokeWidth={2} />
        <line x1={L} y1={B / 2 + 26} x2={L} y2={B / 2 + 54} stroke={wire} strokeWidth={2} />
        <text x={L - 22} y={B / 2 + 8} fontSize={13.5} fontWeight={600} fill="var(--diagram-secondary)" textAnchor="end">
          {spec.voltage}
        </text>
        {/* resistors */}
        {slots.map((x, i) => resistorBox(x, T, true, spec.resistors[i]))}
        {/* current arrow on bottom wire */}
        {spec.showCurrent ? (
          <g>
            <line x1={(L + R) / 2 - 26} y1={B} x2={(L + R) / 2 + 14} y2={B} stroke="var(--diagram-secondary)" strokeWidth={2} />
            <path d={`M${(L + R) / 2 + 22},${B} l-9,-4.5 l0,9 z`} fill="var(--diagram-secondary)" />
            <text x={(L + R) / 2 + 4} y={B + 20} fontSize={13} fontWeight={600} fill="var(--diagram-secondary)" textAnchor="middle" fontStyle="italic">
              I
            </text>
          </g>
        ) : null}
      </svg>
    );
  }

  // parallel: battery left, vertical resistor branches
  const bx = Array.from({ length: n }, (_, i) => L + ((R - L) * (i + 1)) / (n + 1));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
      {/* main loop */}
      <polyline
        points={`${L},${B} ${L},${T} ${R},${T} ${R},${B} ${L},${B}`}
        fill="none"
        stroke={wire}
        strokeWidth={2}
      />
      {/* battery */}
      <line x1={L - 16} y1={B / 2 + 16} x2={L + 16} y2={B / 2 + 16} stroke={wire} strokeWidth={3} />
      <line x1={L - 7} y1={B / 2 + 26} x2={L + 7} y2={B / 2 + 26} stroke={wire} strokeWidth={3} />
      <line x1={L} y1={B / 2 - 34} x2={L} y2={B / 2 + 16} stroke={wire} strokeWidth={2} />
      <line x1={L} y1={B / 2 + 26} x2={L} y2={B / 2 + 54} stroke={wire} strokeWidth={2} />
      <text x={L - 22} y={B / 2 + 8} fontSize={13.5} fontWeight={600} fill="var(--diagram-secondary)" textAnchor="end">
        {spec.voltage}
      </text>
      {/* branches */}
      {bx.map((x, i) => (
        <g key={x}>
          <line x1={x} y1={T} x2={x} y2={B} stroke={wire} strokeWidth={2} />
          {resistorBox(x, B / 2, false, spec.resistors[i])}
        </g>
      ))}
      {spec.showCurrent ? (
        <g>
          <line x1={(L + R) / 2 - 26} y1={B} x2={(L + R) / 2 + 14} y2={B} stroke="var(--diagram-secondary)" strokeWidth={2} />
          <path d={`M${(L + R) / 2 + 22},${B} l-9,-4.5 l0,9 z`} fill="var(--diagram-secondary)" />
          <text x={(L + R) / 2 + 4} y={B + 20} fontSize={13} fontWeight={600} fill="var(--diagram-secondary)" textAnchor="middle" fontStyle="italic">
            I
          </text>
        </g>
      ) : null}
    </svg>
  );
}

/* ================================================================== */
/* Dispatcher                                                          */
/* ================================================================== */

export function ProblemDiagram({
  spec,
  label,
  className,
}: {
  spec: DiagramSpec;
  label?: string;
  className?: string;
}) {
  const inner = useMemo(() => {
    switch (spec.kind) {
      case "function-graph":
        return <FunctionGraph spec={spec} />;
      case "vectors":
        return <Vectors spec={spec} />;
      case "projectile":
        return <Projectile spec={spec} />;
      case "unit-circle":
        return <UnitCircle spec={spec} />;
      case "right-triangle":
        return <RightTriangle spec={spec} />;
      case "free-body":
        return <FreeBody spec={spec} />;
      case "circuit":
        return <Circuit spec={spec} />;
      default:
        return null;
    }
  }, [spec]);

  if (!inner) return null;

  return (
    <figure
      className={cn(
        "rounded-xl border bg-card p-3 sm:p-4 overflow-x-auto nice-scroll",
        className,
      )}
    >
      <div role="img" aria-label={label ?? ""}>
        {inner}
      </div>
    </figure>
  );
}
