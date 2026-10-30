import type { ScienceId } from "./catalog.ts";

export type ScienceDrill = { q: string; answer: string; steps: string[] };
export type ScienceLayer = { bits: string[]; code?: string; drill: ScienceDrill };
export type ScienceLesson = { basic: ScienceLayer; exam: ScienceLayer; adv: ScienceLayer };

export const scienceLessons: Record<ScienceId, ScienceLesson> = {
  python: {
    basic: {
      bits: [
        "Biến giữ một số. `for i in range(1, n+1)` chạy i từ 1 đến n.",
        "Hàm nhận đầu vào và trả một giá trị: `def f(x): return x*x`.",
      ],
      code: "s = 0\nfor i in range(1, 11):\n    s = s + i\n# s = 55",
      drill: {
        q: "Tổng 1 + 2 + … + 10 tính bằng vòng lặp trên bằng bao nhiêu?",
        answer: "55",
        steps: ["Có 10 số.", "Tổng n số đầu là n(n+1)/2.", "10·11/2 = 55."],
      },
    },
    exam: {
      bits: [
        "Bậc hai trong chương trình: tính $\\Delta=b^2-4ac$, rồi phân nhánh theo dấu.",
        "Với $x^2-5x+6=0$: $\\Delta=1$, nghiệm 2 và 3.",
      ],
      code: "delta = b*b - 4*a*c\nif delta > 0:\n    x1 = (-b + delta**0.5) / (2*a)\n    x2 = (-b - delta**0.5) / (2*a)",
      drill: {
        q: "$\\Delta$ của $x^2-5x+6=0$ bằng bao nhiêu?",
        answer: "1",
        steps: ["$b^2-4ac=25-24$.", "$\\Delta=1$."],
      },
    },
    adv: {
      bits: [
        "Tổng Riemann của $x^2$ trên $[0;1]$ tiến tới tích phân $\\int_0^1 x^2\\,dx=\\dfrac13$.",
        "Càng nhiều hình chữ nhật, tổng càng sát $1/3$.",
      ],
      code: "n = 100\ns = 0\nfor i in range(1, n+1):\n    x = i / n\n    s = s + x*x * (1/n)",
      drill: {
        q: "$\\int_0^1 x^2\\,dx$ bằng bao nhiêu?",
        answer: "$1/3$",
        steps: ["Nguyên hàm $x^3/3$.", "Từ 0 đến 1 còn $1/3$."],
      },
    },
  },
  "du-lieu": {
    basic: {
      bits: [
        "Trung bình cộng là tổng chia cho số phần tử.",
        "Trung vị là số đứng giữa sau khi xếp tăng. Dãy chẵn lấy trung bình hai số giữa.",
      ],
      drill: {
        q: "Dãy 2, 4, 4, 6, 9. Trung bình và trung vị?",
        answer: "Trung bình 5, trung vị 4",
        steps: ["Tổng 25, có 5 số, trung bình 5.", "Số giữa là 4."],
      },
    },
    exam: {
      bits: [
        "Phương sai quần thể: $\\dfrac1n\\sum (x_i-\\bar x)^2$.",
        "Độ lệch chuẩn là căn của phương sai.",
      ],
      drill: {
        q: "Phương sai quần thể của 2, 4, 6.",
        answer: "$8/3$",
        steps: ["Trung bình 4.", "Bình phương độ lệch: 4, 0, 4.", "Tổng 8, chia 3 được $8/3$."],
      },
    },
    adv: {
      bits: [
        "Một điểm lệch xa kéo trung bình, trung vị có thể đứng yên hơn.",
        "Đọc biểu đồ: nhìn đơn vị trục trước khi so sánh cột.",
      ],
      drill: {
        q: "Trung vị của 1, 2, 3, 100.",
        answer: "$2{,}5$",
        steps: ["Hai số giữa là 2 và 3.", "Trung vị $(2+3)/2=2{,}5$.", "Trung bình 26,5 bị 100 kéo đi."],
      },
    },
  },
  chuyen: {
    basic: {
      bits: [
        "Với $x>0$, $x+\\dfrac1x\\ge 2$, dấu bằng khi $x=1$.",
        "Đề chuyên thường hỏi đúng điểm rơi, không chỉ viết bất đẳng thức.",
      ],
      drill: {
        q: "GTNN của $x+\\dfrac4x$ với $x>0$.",
        answer: "4",
        steps: ["$x+4/x\\ge 2\\sqrt4=4$.", "Dấu bằng khi $x=2$."],
      },
    },
    exam: {
      bits: [
        "Chữ số tận cùng của lũy thừa nhìn chu kỳ. Lũy thừa của 7 lặp 7, 9, 3, 1.",
        "2026 chia 4 dư 2, nên tận cùng là chữ ở vị trí thứ 2.",
      ],
      drill: {
        q: "Chữ số tận cùng của $7^{2026}$.",
        answer: "9",
        steps: ["Chu kỳ 4.", "2026 = 4·506 + 2.", "Vị trí 2 là 9."],
      },
    },
    adv: {
      bits: [
        "Số cặp nguyên dương thỏa $\\dfrac1x+\\dfrac1y=\\dfrac1n$ bằng số ước dương của $n^2$.",
        "Với $n=6$, $36=2^2\\cdot 3^2$ có 9 ước dương.",
      ],
      drill: {
        q: "Có bao nhiêu cặp nguyên dương $(x;y)$ thỏa $1/x+1/y=1/6$?",
        answer: "9",
        steps: ["$(x-6)(y-6)=36$.", "Cả hai thừa số dương.", "36 có 9 ước dương, mỗi ước một cặp."],
      },
    },
  },
  "vat-ly": {
    basic: {
      bits: [
        "Rơi tự do gần đất: $h=4{,}9t^2$ nếu bỏ sức cản, $h$ tính bằng mét, $t$ bằng giây.",
        "Chiều thời gian lấy nghiệm dương.",
      ],
      drill: {
        q: "Từ 122,5 m, $h=4{,}9t^2$. Sau bao nhiêu giây chạm đất?",
        answer: "5",
        steps: ["$4{,}9t^2=122{,}5$.", "$t^2=25$.", "$t=5$."],
      },
    },
    exam: {
      bits: [
        "Đi một quãng với $v_1$, về cùng quãng với $v_2$: tốc độ trung bình là trung bình điều hòa $\\dfrac{2v_1v_2}{v_1+v_2}$.",
        "Không lấy trung bình cộng của hai vận tốc.",
      ],
      drill: {
        q: "Đi 60 km/h, về 40 km/h. Tốc độ trung bình cả đi lẫn về (km/h)?",
        answer: "48",
        steps: ["$2\\cdot 60\\cdot 40/(60+40)$.", "$4800/100=48$."],
      },
    },
    adv: {
      bits: [
        "Định luật Ohm: $U=IR$. Công suất một chiều $P=UI=I^2R$.",
        "Đơn vị: vôn, ampe, ôm, oát.",
      ],
      drill: {
        q: "Hiệu điện thế 12 V, điện trở 4 Ω. Cường độ dòng điện bằng bao nhiêu ampe?",
        answer: "3",
        steps: ["$I=U/R$.", "$12/4=3$."],
      },
    },
  },
  hoa: {
    basic: {
      bits: [
        "Lượng chất $n=m/M$, với $m$ là khối lượng và $M$ là khối lượng mol.",
        "Nước có $M=18\\ \\mathrm{g/mol}$.",
      ],
      drill: {
        q: "36 g nước là bao nhiêu mol?",
        answer: "2",
        steps: ["$n=36/18$.", "$n=2$ mol."],
      },
    },
    exam: {
      bits: [
        "Pha loãng: khối lượng chất tan giữ nguyên, khối lượng dung dịch tăng.",
        "Nồng độ phần trăm mới = chất tan / dung dịch mới.",
      ],
      drill: {
        q: "200 g dung dịch muối 10%. Thêm bao nhiêu gam nước để được dung dịch 8%?",
        answer: "50",
        steps: ["Muối: 20 g.", "$20/(200+x)=0{,}08$.", "$x=50$."],
      },
    },
    adv: {
      bits: [
        "Axit mạnh một nấc: $\\mathrm{pH}=-\\log[\\mathrm{H}^+]$.",
        "$[\\mathrm{H}^+]=10^{-2}\\ \\mathrm{mol/L}$ thì pH = 2.",
      ],
      drill: {
        q: "pH của dung dịch HCl $0{,}01\\ \\mathrm{mol/L}$.",
        answer: "2",
        steps: ["$\\mathrm{pH}=-\\log 10^{-2}$.", "pH = 2."],
      },
    },
  },
};
