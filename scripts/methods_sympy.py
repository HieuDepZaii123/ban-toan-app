"""Đối chiếu đáp số phương pháp giải. Nhận đường dẫn methods.json."""
import json
import sys

import sympy as sp

x = sp.symbols("x", real=True)
t = sp.symbols("t", real=True)
y = sp.symbols("y", real=True)
ns = {
    "integrate": sp.integrate,
    "diff": sp.diff,
    "sqrt": sp.sqrt,
    "log": sp.log,
    "exp": sp.exp,
    "sin": sp.sin,
    "cos": sp.cos,
    "tan": sp.tan,
    "maximum": sp.maximum,
    "Interval": sp.Interval,
    "pi": sp.pi,
    "Rational": sp.Rational,
    "gcd": sp.gcd,
    "lcm": sp.lcm,
    "expand": sp.expand,
    "y": y,
    "x": x,
    "t": t,
}


def main() -> None:
    data = json.load(open(sys.argv[1], encoding="utf-8"))
    fails = []
    count = 0
    for method in data["methods"]:
        for row in method["verify"]:
            count += 1
            lhs = eval(row["lhs"], {"__builtins__": {}}, ns)
            rhs = eval(row["rhs"], {"__builtins__": {}}, ns)
            if sp.simplify(lhs - rhs) != 0:
                fails.append(f"{row['where']}: {lhs} != {rhs}")
    if fails:
        print("\n".join(fails), file=sys.stderr)
        sys.exit(1)
    print(f"methods sympy ok: {count} checks")


if __name__ == "__main__":
    main()
