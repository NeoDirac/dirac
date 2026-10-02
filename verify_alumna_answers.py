#!/usr/bin/env python3
"""Independent verification of the alumna's German worksheet (Oct 2025)
+ Venn survey problem, using the tutor's transcription as ground truth.

S1 (Factorizar / ausklammern) — MC answers checked as identities.
S2 (Simplificar fracciones algebraicas) — symbolic simplify match.
S3 (Anwendung: potencias con exponentes negativos) — symbolic match.
Venn (Imagen 2, partes b–e) — inclusion–exclusion arithmetic + region table.
"""
import sympy as sp
from sympy import symbols, simplify, Rational, Eq, expand

u, x, y, z, a, b, c, p, q, r, s, n, m = symbols("u x y z a b c p q r s n m", positive=True)

ok = 0
fail = 0

def check(name, lhs, rhs):
    global ok, fail
    diff = simplify(lhs - rhs)
    good = diff == 0
    print(f"{'✓' if good else '✗'} {name}: {lhs} == {rhs}")
    if good: ok += 1
    else:
        fail += 1
        print(f"    DIFF = {diff}")

print("=== Sección 1: Factorizar ===")
check("S1.1", 8*u**5 - 2*u**9, 2*u**5*(4 - u**4))
check("S1.2", x**n - x**(n+1), x**n*(1 - x))
check("S1.3", z_ := z**m - z**(m-2), z**(m-2)*(z**2 - 1))
check("S1.3b", z**m - z**(m-2), z**(m-2)*(z-1)*(z+1))
check("S1.4", 8*a**(n-3) + 12*a**(3*n-2), 4*a**(n-3)*(2 + 3*a**(2*n+1)))

print("\n=== Sección 2: Simplificar fracciones algebraicas ===")
check("S2.1", (x**6 + x**5)/(x**4 + x**3), x**2)
check("S2.2", (12*x**3*y**2 - 18*x**2*y**3)/(5*x**2*y**2 + x**3*y**2),
      6*(2*x - 3*y)/(x + 5))
check("S2.3", (a**n + a**(n+1))/(a**(n+2) + a**(n+1)), 1/a)
check("S2.4", (b**(n+1) - 5*b**n)/(b**(n-1) - 5*b**(n-2)), b**2)
check("S2.5", (c**p - c**(p+2))/(c**(p+1) + c**p), 1 - c)
check("S2.6", (x**(n-1) - x**n)/(x**(n-2) - x**n), x/(1 + x))
check("S2.7", (8*a**x - 8*a**(x-2))/(6*a**(x-4) + 6*a**(x-3)),
      Rational(4,3)*a**2*(a - 1))

print("\n=== Sección 3: Anwendung (potencias) ===")
check("S3.1", (a**-4*b**5)/(x**3*y**-2) * (x**-2*y**-1)/(a**3*b**6),
      y/(a**7*b*x**5))
check("S3.2", (x**-2*y**-5)/(a**-3*b**-1) / ((a**-1*b)/(x**-2*y**-7)),
      a**4/(x**4*y**12))
check("S3.3", (p**3*q**-2)/(r**-3*s**-5) / ((r**-6*s**-1)/(p**-1*q**2)),
      p**2*r**9*s**6)
check("S3.4", ((a**2*b**-2)/(r**-4*s**-3))**2 / ((r**-3*s**-1)/(a**-1*b))**-4,
      a**8*s**2/(b**8*r**4))
check("S3.5", ((4*a**2*b)**-2)/(x**2*y**-1) / (((x**-1*y)**2)/((a**-2*b)**-3)),
      a**2/(16*b**5*y))
check("S3.6", ((36*x**-2*y**-1)/(3*x**-2*y**-2))**-2 * (x**-3*(2*y**-2)**2)/(2*x**3*y**-2),
      1/(72*x**6*y**4))
check("S3.7", (((a*b**-2)/(a**2*b))**-2)**-1, 1/(a**2*b**6))

print("\n=== Imagen 2: Venn (mermelada/miel/Nutella) ===")
# |M|=55, |H|=47, |N|=45; |M∩H|=22, |M∩N|=25, |H∩N|=19; all 100 like >= 1
M, H, N = 55, 47, 45
MH, MN, HN = 22, 25, 19
total = 100
x3 = total - (M + H + N - MH - MN - HN)   # center
print(f"  center x = 100 - (55+47+45-22-25-19) = {x3}")
assert 0 <= x3 <= min(MH, MN, HN), "center out of range"
Monly = M - MH - MN + x3
Honly = H - MH - HN + x3
Nonly = N - MN - HN + x3
MHonly, MNonly, HNonly = MH - x3, MN - x3, HN - x3
region_sum = Monly + Honly + Nonly + MHonly + MNonly + HNonly + x3
print(f"  regions: M only={Monly}, H only={Honly}, N only={Nonly}, "
      f"M∩H only={MHonly}, M∩N only={MNonly}, H∩N only={HNonly}, center={x3}")
print(f"  region sum = {region_sum} (must be 100)")
assert region_sum == total
b = x3                                        # les gustan los tres
c = MHonly + MNonly + HNonly + x3             # al menos dos
d = total - x3                                # como máximo dos
e = H + N - HN                                # miel o Nutella
print(f"  b) los tres = {b}")
print(f"  c) al menos dos = {c}  (check 22+25+19-2·19 = {MH+MN+HN-2*x3})")
print(f"  d) como máximo dos = {d}")
print(f"  e) miel o Nutella = {e}")
assert b == 19 and c == 28 and d == 81 and e == 73
ok += 4

print(f"\n{'='*50}\nRESULT: {ok} ok, {fail} failed")
if fail:
    raise SystemExit(1)
print("ALL CHECKS PASSED")
