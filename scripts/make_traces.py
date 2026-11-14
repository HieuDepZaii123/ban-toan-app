"""Chạy thật các đoạn code của mảng Lập trình và ghi lại từng bước để app phát lại.

Mỗi đoạn có phần chuẩn bị (gán dữ liệu vào, gọi hàm) chạy trước, rồi đến đúng đoạn code
hiển thị trong bài. Chỉ các dòng của đoạn hiển thị được ghi lại.

Chạy:  python3 scripts/make_traces.py            ghi src/science/traces.json
       python3 scripts/make_traces.py --check    báo lỗi nếu tệp cũ khác kết quả chạy mới
"""
import json
import sys

OUT = "src/science/traces.json"
MAX_STEPS = 60

SNIPPETS = [
    {
        "code": "s = 0\nfor i in range(1, 11):\n    s = s + i\n# s = 55",
        "setup": "",
        "after": "",
        "note": "Chạy đúng đoạn code trong bài.",
    },
    {
        "code": "delta = b*b - 4*a*c\nif delta > 0:\n    x1 = (-b + delta**0.5) / (2*a)\n    x2 = (-b - delta**0.5) / (2*a)",
        "setup": "a = 1\nb = -5\nc = 6\n",
        "after": "",
        "note": "Chạy với a = 1, b = -5, c = 6, tức phương trình x² − 5x + 6 = 0.",
    },
    {
        "code": "n = 100\ns = 0\nfor i in range(1, n+1):\n    x = i / n\n    s = s + x*x * (1/n)",
        "setup": "",
        "after": "",
        "replace": ("n = 100", "n = 5"),
        "note": "Chạy với n = 5 thay cho 100 để số bước vừa đủ xem hết; với n = 100 thì s ≈ 0,338.",
    },
    {
        "code": "def ucln(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n# ucln(48, 18) = 6",
        "setup": "",
        "after": "ket_qua = ucln(48, 18)\n",
        "note": "Gọi ucln(48, 18).",
    },
    {
        "code": "def chia_doi(f, a, b, k):\n    for _ in range(k):\n        m = (a + b) / 2\n        if f(a) * f(m) <= 0:\n            b = m\n        else:\n            a = m\n    return (a + b) / 2",
        "setup": "def f(x):\n    return x * x - 2\n",
        "after": "ket_qua = chia_doi(f, 1, 2, 5)\n",
        "note": "Gọi chia_doi với f(x) = x² − 2 trên đoạn [1; 2], 5 bước, để tìm √2.",
    },
]


def show(value):
    if callable(value):
        return "hàm"
    if isinstance(value, float):
        text = f"{value:.6g}"
        return text.replace(".", ",")
    if isinstance(value, range):
        return f"range({value.start}, {value.stop})"
    return repr(value)


def trace(snippet):
    shown = snippet["code"]
    run = shown
    if "replace" in snippet:
        old, new = snippet["replace"]
        run = run.replace(old, new, 1)
    setup_lines = snippet["setup"].count("\n")
    source = snippet["setup"] + run + "\n" + snippet["after"]
    first = setup_lines + 1
    last = setup_lines + run.count("\n") + 1
    steps = []

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != "<snippet>":
            return tracer
        if event == "line" and first <= frame.f_lineno <= last and len(steps) < MAX_STEPS:
            names = {
                key: show(val)
                for key, val in frame.f_locals.items()
                if not key.startswith("__") and key not in ("f",) and not callable(val)
            }
            steps.append({"line": frame.f_lineno - first, "vars": names})
        return tracer

    scope = {}
    sys.settrace(tracer)
    try:
        exec(compile(source, "<snippet>", "exec"), scope)
    finally:
        sys.settrace(None)
    # Dòng cuối: trạng thái sau khi chạy xong, kể cả kết quả của lời gọi hàm.
    final = {k: show(v) for k, v in scope.items() if not k.startswith("__") and not callable(v)}
    steps.append({"line": -1, "vars": final})
    return {"code": shown, "run": run, "note": snippet["note"], "steps": steps}


def main():
    data = [trace(item) for item in SNIPPETS]
    text = json.dumps(data, ensure_ascii=False, indent=1) + "\n"
    if "--check" in sys.argv:
        old = open(OUT, encoding="utf-8").read()
        if old != text:
            print(f"{OUT} đã cũ: chạy python3 scripts/make_traces.py", file=sys.stderr)
            sys.exit(1)
        print(f"traces ok: {len(data)} đoạn, {sum(len(d['steps']) for d in data)} bước")
        return
    open(OUT, "w", encoding="utf-8").write(text)
    print(f"đã ghi {OUT}")


if __name__ == "__main__":
    main()
