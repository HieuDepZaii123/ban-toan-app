"""Kiểm các đẳng thức trong dạng bài. Nhận JSON trên stdin."""
import json
import sys

import sympy as sp


def main() -> None:
    rows = json.load(sys.stdin)
    fails = []
    for row in rows:
        expr = sp.simplify(sp.sympify(row["expr"]))
        expect = sp.simplify(sp.sympify(row["expect"]))
        if sp.simplify(expr - expect) != 0:
            fails.append(f"{row['where']}: {row['expr']} != {row['expect']} ({expr} vs {expect})")
    if fails:
        print("\n".join(fails), file=sys.stderr)
        sys.exit(1)
    print(f"sympy ok: {len(rows)} checks")


if __name__ == "__main__":
    main()
