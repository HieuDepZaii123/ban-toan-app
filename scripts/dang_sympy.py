"""Kiểm các đẳng thức trong dạng bài. Nhận JSON trên stdin."""
import json
import sys

import sympy as sp


def as_solution_set(obj):
    if isinstance(obj, sp.And):
        acc = None
        for arg in obj.args:
            piece = as_solution_set(arg)
            acc = piece if acc is None else acc.intersect(piece)
        return acc
    if isinstance(obj, sp.Or):
        acc = sp.EmptySet
        for arg in obj.args:
            acc = acc.union(as_solution_set(arg))
        return acc
    if getattr(obj, "is_Relational", False):
        return obj.as_set()
    return obj


def same(expr, expect) -> bool:
    try:
        if sp.simplify(expr - expect) == 0:
            return True
    except Exception:
        pass
    try:
        return as_solution_set(expr) == as_solution_set(expect)
    except Exception:
        return False


def main() -> None:
    rows = json.load(sys.stdin)
    fails = []
    for row in rows:
        expr = sp.sympify(row["expr"])
        expect = sp.sympify(row["expect"])
        if not same(expr, expect):
            fails.append(f"{row['where']}: {row['expr']} != {row['expect']} ({expr} vs {expect})")
    if fails:
        print("\n".join(fails), file=sys.stderr)
        sys.exit(1)
    print(f"sympy ok: {len(rows)} checks")


if __name__ == "__main__":
    main()
