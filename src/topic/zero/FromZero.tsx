import type { ReactNode } from "react";
import { MathText } from "../../ui/MathText.tsx";
import { AdditionLab, BeatLab, ReflectLab, SolveLab, TriangleLab, WaveLab } from "./trigWidgets.tsx";
import { BallValley, BisectLab, CircleWalk, CompoundLab, CramerLab, DartLab, DiceLab, DotNeuron, EnumLab, EpsilonGame, HillClimbLab, NetFit, PartialSums, PerceptronLab, RiemannLab, SecantLab, type NetTarget } from "./widgets.tsx";

const PARABOLA: NetTarget = { name: "parabol", fn: (x) => 0.5 * x * x - 1, x0: -3, x1: 3, y0: -2, y1: 5 };
const EXP: NetTarget = { name: "2^x", fn: (x) => 2 ** x, x0: -2, x1: 3, y0: -0.5, y1: 9 };
const SINE: NetTarget = { name: "sin x", fn: Math.sin, x0: -3.2, x1: 3.2, y0: -1.5, y1: 1.5 };
const CUBIC: NetTarget = { name: "bậc ba", fn: (x) => 0.25 * x ** 3 - 0.75 * x, x0: -3, x1: 3, y0: -4, y1: 4 };

const NET_WHY = "Mạng không chứa công thức của hàm. Nó chỉ có các nơ-ron xếp chồng: mỗi nơ-ron tạo một hình chữ S mờ (các đường xám), cộng chúng lại có trọng số được đường cam. «Học» là bài toán bóng lăn ở trên nhưng với hàng chục ẩn số: tính độ dốc của sai số theo từng trọng số (quy tắc hàm hợp, tức lan truyền ngược), rồi bước ngược dốc. Điều này cho thấy đạo hàm và hàm số không chỉ là bài tập: đó là cách máy học.";

const SECTIONS: Record<string, { lead: string; parts: () => ReactNode }> = {
  quadratic: {
    lead: "Muốn tìm đỉnh parabol, bạn có thể thuộc công thức $-\\frac{b}{2a}$, hoặc để một thuật toán tự mò đáy rồi so với công thức. Dưới đây là cả hai, và một mạng nơ-ron học lại đường parabol từ các điểm mẫu.",
    parts: () => (
      <>
        <BallValley kind="quad" />
        <NetFit target={PARABOLA} story="Cho mạng xem 41 chấm nằm trên một parabol, không cho biết công thức. Mạng bắt đầu với các số ngẫu nhiên nên đường cong ban đầu vô nghĩa. Bấm học và quan sát nó uốn dần về các chấm." why={NET_WHY} />
      </>
    ),
  },
  ineq: {
    lead: "Bất đẳng thức nói «không thể thấp hơn». Thuật toán leo đồi chứng kiến điều đó: nó tìm đáy và dừng đúng chỗ dấu bằng.",
    parts: () => <HillClimbLab />,
  },
  exp: {
    lead: "Hàm mũ là «nhân lặp». Hãy xem nhân lặp chia nhỏ dần ra sao khi kì lãi ngắn lại, rồi xem một mạng nơ-ron học cái dáng bùng nổ của hàm mũ.",
    parts: () => (
      <>
        <CompoundLab />
        <NetFit target={EXP} story="Cho mạng xem các chấm của 2^x. Hàm này tăng ngày càng nhanh, nên mạng phải uốn đường cong mỗi lúc một gắt. Thử ít nơ-ron (2–3) và nhiều nơ-ron (12–16) để thấy sự khác nhau." why={NET_WHY} />
      </>
    ),
  },
  sequence: {
    lead: "Dãy số là danh sách có thứ tự; tổng là việc cộng dồn. Máy tính chỉ làm được hữu hạn bước, nên nó cộng dồn từng miếng và xem tổng có chịu dừng lại không.",
    parts: () => (
      <>
        <PartialSums />
        <EpsilonGame />
      </>
    ),
  },
  trig: {
    lead: "Sin và cos không phải bảng số phải thuộc. Chúng sinh ra từ việc đi vòng quanh một đường tròn, và mạng nơ-ron học được dáng sóng ấy từ các điểm mẫu.",
    parts: () => (
      <>
        <CircleWalk />
        <ReflectLab />
        <AdditionLab />
        <WaveLab />
        <SolveLab />
        <TriangleLab />
        <BeatLab />
        <NetFit target={SINE} story="Cho mạng xem một chu kì của sin x. Một sóng cần ít nhất vài nơ-ron: mỗi nơ-ron tạo một chữ S, ghép chữ S lên xuống thành sóng." why={NET_WHY} />
      </>
    ),
  },
  limit: {
    lead: "Giới hạn là lời hứa về sai số: bạn đưa sai số bao nhiêu thì tôi chỉ ra được đoạn dãy nằm trong sai số đó. Và định lí giá trị trung gian là một thuật toán chia đôi.",
    parts: () => (
      <>
        <EpsilonGame />
        <BisectLab />
      </>
    ),
  },
  derivative: {
    lead: "Đạo hàm là độ dốc của cát tuyến khi bước nhảy co lại. Ta cho máy làm đúng phép co ấy, rồi dùng độ dốc để lăn bóng xuống đáy.",
    parts: () => (
      <>
        <SecantLab />
        <BallValley kind="w" />
      </>
    ),
  },
  survey: {
    lead: "Khảo sát hàm số là đọc bản đồ: độ dốc bằng 0 là nơi quay đầu. Thuật toán lăn bóng cho thấy rõ cực tiểu cục bộ, và mạng nơ-ron học lại đồ thị bậc ba.",
    parts: () => (
      <>
        <BallValley kind="w" />
        <NetFit target={CUBIC} story="Đồ thị bậc ba có một đỉnh đồi và một đáy. Nhìn xem mạng có tự uốn ra đúng hai chỗ quay đầu không." why={NET_WHY} />
      </>
    ),
  },
  integral: {
    lead: "Tích phân là cộng vô số dải mỏng. Máy chỉ cộng được hữu hạn dải, và ta nhìn nó dồn về giá trị mà nguyên hàm cho ngay.",
    parts: () => <RiemannLab />,
  },
  vector: {
    lead: "Vectơ là chỉ dẫn di chuyển; tích vô hướng đo hai hướng ăn khớp đến đâu. Một nơ-ron của mạng chỉ làm đúng phép ấy. Định thức quyết định hệ phương trình có nghiệm.",
    parts: () => (
      <>
        <DotNeuron />
        <CramerLab />
      </>
    ),
  },
  analytic: {
    lead: "Đường thẳng được xác định bởi pháp tuyến. Một nơ-ron học tìm đường thẳng ngăn cách hai nhóm điểm sẽ tự tìm ra pháp tuyến, và khoảng cách đến đường thẳng là phép chiếu lên pháp tuyến.",
    parts: () => <PerceptronLab />,
  },
  triangle: {
    lead: "Công thức diện tích và thể tích kiểm được bằng thực nghiệm: ném điểm ngẫu nhiên và đếm tỉ lệ rơi vào hình.",
    parts: () => (
      <>
        <DartLab mode="pi" />
        <DartLab mode="ball" />
      </>
    ),
  },
  combo: {
    lead: "Đếm là liệt kê. Máy liệt kê rất nhanh, nhưng chỉ đến một giới hạn; công thức giúp đếm mà không liệt kê.",
    parts: () => <EnumLab />,
  },
  probability: {
    lead: "Xác suất là điều xảy ra khi lặp lại thật nhiều lần. Ta vừa đếm bằng lập luận vừa chạy mô phỏng, rồi so hai bên.",
    parts: () => <DiceLab />,
  },
};

export default function FromZero({ topicId }: { topicId: string }) {
  const section = SECTIONS[topicId];
  if (!section) return null;
  return (
    <section className="fz" aria-labelledby="fz-title">
      <h2 id="fz-title">Suy từ số 0: tự tay chạy thuật toán</h2>
      <p className="fz-lead"><MathText text={section.lead} /></p>
      {section.parts()}
    </section>
  );
}
