"""Đối chiếu đáp số luyện tập. JSON trên stdin: [{where, lhs, rhs}]."""
import json
import sys

import sympy as sp

x = sp.symbols("x")
ns = {
    "integrate": sp.integrate,
    "diff": sp.diff,
    "solve": sp.solve,
    "prod": sp.prod,
    "sqrt": sp.sqrt,
    "log": sp.log,
    "exp": sp.exp,
    "sin": sp.sin,
    "cos": sp.cos,
    "Abs": sp.Abs,
    "pi": sp.pi,
    "Rational": sp.Rational,
    "x": x,
    "Max": sp.Max,
    "sum": sum,
}


def main() -> None:
    rows = json.load(sys.stdin)
    fails = []
    for row in rows:
        lhs = sp.nsimplify(eval(row["lhs"], {"__builtins__": {}}, ns))
        rhs = sp.nsimplify(eval(row["rhs"], {"__builtins__": {}}, ns))
        if sp.simplify(lhs - rhs) != 0:
            fails.append(f"{row['where']}: {lhs} != {rhs}")
    if fails:
        print("\n".join(fails), file=sys.stderr)
        sys.exit(1)
    print(f"practice sympy ok: {len(rows)} checks")


if __name__ == "__main__":
    main()
