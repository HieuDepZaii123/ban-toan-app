import type { ReactNode } from "react";
import { MathText } from "../../ui/MathText.tsx";
import { useTx } from "./kit.ts";
import { CounterexampleLab, DiffHeatLab, CauchyVecLab, MeansLab, RectangleLab, TriIneqLab } from "./ineqWidgets.tsx";
import { AsymptoteLab, ContinuityLab, IndeterminateLab, SqueezeLab, ZoomLab } from "./limitWidgets.tsx";
import { CircleLineLab, LineFormsLab, PlaneLab, SphereSectionLab, TwoLinesLab } from "./analyticWidgets.tsx";
import { ArchimedesLab, PythagorasLab, SectorConeLab, SimilarityLab, TetraRatioLab, TriCentersLab } from "./triangleWidgets.tsx";
import { AlphaLab, CompleteSquareLab, FitLab, IntervalLab, LineIntersectLab, RootsLab, ShapeLab, SignLab, TranslateLab } from "./quadWidgets.tsx";
import { AntiderivLab, AreaBetweenLab, AreaFunctionLab, DisplacementLab, MonteCarloAreaLab, PartsLab, SubstitutionLab, VolumeLab } from "./integralWidgets.tsx";
import { BackpropLab, BoxLab, DerivCurveLab, ExtremaLab, KinkLab, MotionLab, RuleLab, TangentLab } from "./derivWidgets.tsx";
import { AdditionLab, BeatLab, ReflectLab, SolveLab, TriangleLab, WaveLab } from "./trigWidgets.tsx";
import { BallValley, BisectLab, CircleWalk, CompoundLab, CramerLab, DartLab, DiceLab, DotNeuron, EnumLab, EpsilonGame, HillClimbLab, NetFit, PartialSums, PerceptronLab, RiemannLab, SecantLab, type NetTarget } from "./widgets.tsx";

const PARABOLA: NetTarget = { name: "parabol", fn: (x) => 0.5 * x * x - 1, x0: -3, x1: 3, y0: -2, y1: 5 };
const EXP: NetTarget = { name: "2^x", fn: (x) => 2 ** x, x0: -2, x1: 3, y0: -0.5, y1: 9 };
const SINE: NetTarget = { name: "sin x", fn: Math.sin, x0: -3.2, x1: 3.2, y0: -1.5, y1: 1.5 };
const CUBIC: NetTarget = { name: "bậc ba", fn: (x) => 0.25 * x ** 3 - 0.75 * x, x0: -3, x1: 3, y0: -4, y1: 4 };

const NET_WHY: [string, string] = ["Mạng không chứa công thức của hàm. Nó chỉ có các nơ-ron xếp chồng: mỗi nơ-ron tạo một hình chữ S mờ (các đường xám), cộng chúng lại có trọng số được đường cam. «Học» là bài toán bóng lăn ở trên nhưng với hàng chục ẩn số: tính độ dốc của sai số theo từng trọng số (quy tắc hàm hợp, tức lan truyền ngược), rồi bước ngược dốc. Điều này cho thấy đạo hàm và hàm số không chỉ là bài tập: đó là cách máy học.", "The network contains no formula for the function. It only has stacked neurons: each neuron makes a faint S-shaped curve (the grey lines), and adding them with weights gives the orange line. «Learning» is the rolling-ball problem above but with dozens of unknowns: compute the slope of the error with respect to each weight (the chain rule, i.e. backpropagation), then step against the slope. This shows that derivatives and functions are not just exercises: they are how machines learn."];

const SECTIONS: Record<string, { lead: [string, string]; parts: () => ReactNode }> = {
  quadratic: {
    lead: ["Muốn tìm đỉnh parabol, bạn có thể thuộc công thức $-\\frac{b}{2a}$, hoặc để một thuật toán tự mò đáy rồi so với công thức. Dưới đây là cả hai, và một mạng nơ-ron học lại đường parabol từ các điểm mẫu.", "To find the vertex of a parabola you can memorise the formula $-\\frac{b}{2a}$, or let an algorithm feel its way to the bottom and compare with the formula. Below are both, plus a neural network that relearns the parabola from sample points, and a tour of shape, completing the square, roots, signs and intervals."],
    parts: () => (
      <>
        <ShapeLab />
        <CompleteSquareLab />
        <TranslateLab />
        <BallValley kind="quad" />
        <RootsLab />
        <SignLab />
        <LineIntersectLab />
        <AlphaLab />
        <IntervalLab />
        <FitLab />
        <NetFit target={PARABOLA} story={["Cho mạng xem 41 chấm nằm trên một parabol, không cho biết công thức. Mạng bắt đầu với các số ngẫu nhiên nên đường cong ban đầu vô nghĩa. Bấm học và quan sát nó uốn dần về các chấm.", "Show the network 41 dots lying on a parabola without telling it the formula. The network starts with random numbers, so the initial curve means nothing. Press train and watch it bend towards the dots."]} why={NET_WHY} />
      </>
    ),
  },
  ineq: {
    lead: ["Bất đẳng thức nói «không thể thấp hơn». Bản đồ dấu cho thấy hiệu hai vế chưa bao giờ âm, hình học (nửa đường tròn, hình chữ nhật, vectơ) cho thấy vì sao, thuật toán leo đồi tìm đúng dấu bằng, và phép thử ngẫu nhiên nhắc rằng thử số không thay được chứng minh.", "An inequality says «it cannot be lower». The sign map shows the difference of the two sides is never negative, geometry (the semicircle, rectangles, vectors) shows why, the hill-climbing algorithm finds the exact equality case, and random testing reminds us that testing numbers cannot replace a proof."],
    parts: () => (
      <>
        <DiffHeatLab />
        <MeansLab />
        <RectangleLab />
        <CauchyVecLab />
        <TriIneqLab />
        <HillClimbLab />
        <CounterexampleLab />
      </>
    ),
  },
  exp: {
    lead: ["Hàm mũ là «nhân lặp». Hãy xem nhân lặp chia nhỏ dần ra sao khi kì lãi ngắn lại, rồi xem một mạng nơ-ron học cái dáng bùng nổ của hàm mũ.", "The exponential function is «repeated multiplication». See how repeated multiplication behaves as the compounding period gets shorter, then watch a neural network learn the explosive shape of the exponential."],
    parts: () => (
      <>
        <CompoundLab />
        <NetFit target={EXP} story={["Cho mạng xem các chấm của 2^x. Hàm này tăng ngày càng nhanh, nên mạng phải uốn đường cong mỗi lúc một gắt. Thử ít nơ-ron (2–3) và nhiều nơ-ron (12–16) để thấy sự khác nhau.", "Show the network the dots of 2^x. This function grows faster and faster, so the network must bend the curve more and more sharply. Try few neurons (2–3) and many (12–16) to see the difference."]} why={NET_WHY} />
      </>
    ),
  },
  sequence: {
    lead: ["Dãy số là danh sách có thứ tự; tổng là việc cộng dồn. Máy tính chỉ làm được hữu hạn bước, nên nó cộng dồn từng miếng và xem tổng có chịu dừng lại không.", "A sequence is an ordered list and a sum is an accumulation. A computer can only do finitely many steps, so it adds piece by piece and checks whether the total is willing to settle."],
    parts: () => (
      <>
        <PartialSums />
        <EpsilonGame />
      </>
    ),
  },
  trig: {
    lead: ["Sin và cos không phải bảng số phải thuộc. Chúng sinh ra từ việc đi vòng quanh một đường tròn, và mạng nơ-ron học được dáng sóng ấy từ các điểm mẫu.", "Sine and cosine are not tables to memorise. They are born from going around a circle, and a neural network can learn the shape of that wave from sample points."],
    parts: () => (
      <>
        <CircleWalk />
        <ReflectLab />
        <AdditionLab />
        <WaveLab />
        <SolveLab />
        <TriangleLab />
        <BeatLab />
        <NetFit target={SINE} story={["Cho mạng xem một chu kì của sin x. Một sóng cần ít nhất vài nơ-ron: mỗi nơ-ron tạo một chữ S, ghép chữ S lên xuống thành sóng.", "Show the network one period of sin x. A wave needs at least a few neurons: each neuron makes one S, and the S-shapes combine up and down into a wave."]} why={NET_WHY} />
      </>
    ),
  },
  limit: {
    lead: ["Giới hạn là lời hứa về sai số: bạn đưa sai số bao nhiêu thì tôi chỉ ra được đoạn dãy nằm trong sai số đó. Ta phóng to những chỗ lỗ hổng, so tốc độ co của tử và mẫu, kẹp đường cong giữa hai bức tường, tìm tiệm cận, và chia đôi để bắt nghiệm.", "A limit is a promise about error: whatever error you name, I can point to a stretch of the sequence inside it. We zoom in on holes, compare how fast numerator and denominator shrink, squeeze a curve between two walls, find asymptotes, and use bisection to catch roots."],
    parts: () => (
      <>
        <EpsilonGame />
        <ZoomLab />
        <IndeterminateLab />
        <SqueezeLab />
        <AsymptoteLab />
        <ContinuityLab />
        <BisectLab />
      </>
    ),
  },
  derivative: {
    lead: ["Đạo hàm là độ dốc của cát tuyến khi bước nhảy co lại. Ta cho máy làm đúng phép co ấy, rồi dùng độ dốc để lăn bóng xuống đáy.", "The derivative is the slope of a secant as the jump shrinks. We make the machine do exactly that shrinking, and then use the slope to roll a ball down to the bottom."],
    parts: () => (
      <>
        <SecantLab />
        <DerivCurveLab />
        <KinkLab />
        <RuleLab />
        <BackpropLab />
        <MotionLab />
        <TangentLab />
        <ExtremaLab />
        <BoxLab />
        <BallValley kind="w" />
      </>
    ),
  },
  survey: {
    lead: ["Khảo sát hàm số là đọc bản đồ: độ dốc bằng 0 là nơi quay đầu. Thuật toán lăn bóng cho thấy rõ cực tiểu cục bộ, và mạng nơ-ron học lại đồ thị bậc ba.", "Studying a function is reading a map: slope 0 is where the curve turns. The rolling-ball algorithm shows local minima clearly, and a neural network relearns the cubic graph."],
    parts: () => (
      <>
        <BallValley kind="w" />
        <NetFit target={CUBIC} story={["Đồ thị bậc ba có một đỉnh đồi và một đáy. Nhìn xem mạng có tự uốn ra đúng hai chỗ quay đầu không.", "A cubic graph has one hilltop and one bottom. See whether the network bends out exactly two turning points by itself."]} why={NET_WHY} />
      </>
    ),
  },
  integral: {
    lead: ["Tích phân là cộng vô số dải mỏng. Máy chỉ cộng được hữu hạn dải, và ta nhìn nó dồn về giá trị mà nguyên hàm cho ngay.", "An integral is adding countless thin strips. A machine can only add finitely many, and we watch the sum settle at the value that the antiderivative gives at once."],
    parts: () => (
      <>
        <RiemannLab />
        <AntiderivLab />
        <AreaFunctionLab />
        <DisplacementLab />
        <AreaBetweenLab />
        <SubstitutionLab />
        <PartsLab />
        <VolumeLab />
        <MonteCarloAreaLab />
      </>
    ),
  },
  vector: {
    lead: ["Vectơ là chỉ dẫn di chuyển; tích vô hướng đo hai hướng ăn khớp đến đâu. Một nơ-ron của mạng chỉ làm đúng phép ấy. Định thức quyết định hệ phương trình có nghiệm.", "A vector is an instruction to move; the dot product measures how well two directions agree. One neuron of a network does exactly that. The determinant decides whether a system of equations has a solution."],
    parts: () => (
      <>
        <DotNeuron />
        <CramerLab />
      </>
    ),
  },
  analytic: {
    lead: ["Đường thẳng được xác định bởi pháp tuyến. Ta đi từ một đường thẳng, hai đường thẳng, đường tròn, rồi lên mặt phẳng và mặt cầu trong không gian. Một nơ-ron học tìm đường thẳng ngăn cách hai nhóm điểm sẽ tự tìm ra pháp tuyến, và khoảng cách đến đường thẳng là phép chiếu lên pháp tuyến.", "A line is determined by its normal. We go from one line to two lines, then to the circle, and up to planes and spheres in space. A neuron learning to separate two groups of points finds the normal by itself, and the distance to a line is a projection onto the normal."],
    parts: () => (
      <>
        <LineFormsLab />
        <TwoLinesLab />
        <CircleLineLab />
        <PerceptronLab />
        <PlaneLab />
        <SphereSectionLab />
      </>
    ),
  },
  triangle: {
    lead: ["Công thức diện tích và thể tích kiểm được bằng thực nghiệm: ném điểm ngẫu nhiên và đếm tỉ lệ rơi vào hình. Ta còn dựng bốn tâm của tam giác bằng toạ độ, chứng minh Pythagore bằng cắt ghép, đếm ô vuông cho đồng dạng, chồng đĩa cho Archimedes, trải vỏ nón và ném điểm vào khối.", "Area and volume formulas can be checked by experiment: throw random points and count the share that land in the shape. We also build the four centres of a triangle from coordinates, prove Pythagoras by cutting and fitting, count squares for similarity, stack discs for Archimedes, unroll a cone, and throw points into a solid."],
    parts: () => (
      <>
        <TriCentersLab />
        <PythagorasLab />
        <SimilarityLab />
        <ArchimedesLab />
        <SectorConeLab />
        <TetraRatioLab />
        <DartLab mode="pi" />
        <DartLab mode="ball" />
      </>
    ),
  },
  combo: {
    lead: ["Đếm là liệt kê. Máy liệt kê rất nhanh, nhưng chỉ đến một giới hạn; công thức giúp đếm mà không liệt kê.", "Counting is listing. The machine lists very fast but only up to a limit; formulas let us count without listing."],
    parts: () => <EnumLab />,
  },
  probability: {
    lead: ["Xác suất là điều xảy ra khi lặp lại thật nhiều lần. Ta vừa đếm bằng lập luận vừa chạy mô phỏng, rồi so hai bên.", "Probability is what happens when you repeat something a very large number of times. We count by reasoning and also run simulations, then compare the two."],
    parts: () => <DiceLab />,
  },
};

export default function FromZero({ topicId }: { topicId: string }) {
  const tt = useTx();
  const section = SECTIONS[topicId];
  if (!section) return null;
  return (
    <section className="fz" aria-labelledby="fz-title">
      <h2 id="fz-title">{tt("Suy từ số 0: tự tay chạy thuật toán", "From zero: run the algorithms yourself")}</h2>
      <p className="fz-lead"><MathText text={tt(section.lead[0], section.lead[1])} /></p>
      {section.parts()}
    </section>
  );
}
