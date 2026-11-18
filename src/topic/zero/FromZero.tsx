import { lazy, Suspense, type ComponentType } from "react";
import { MathText } from "../../ui/MathText.tsx";
import { BridgeFigures } from "./bridges.tsx";
import { useTx } from "./kit.ts";
import { TopicLinks } from "./links.tsx";

/** Mỗi chuyên đề là một mô-đun riêng, chỉ tải khi người học mở chuyên đề đó (các hình dùng canvas và thuật toán khá nặng). */
const PARTS: Record<string, ComponentType> = {
  quadratic: lazy(() => import("./sections/quadratic.tsx")),
  ineq: lazy(() => import("./sections/ineq.tsx")),
  exp: lazy(() => import("./sections/exp.tsx")),
  sequence: lazy(() => import("./sections/sequence.tsx")),
  trig: lazy(() => import("./sections/trig.tsx")),
  limit: lazy(() => import("./sections/limit.tsx")),
  derivative: lazy(() => import("./sections/derivative.tsx")),
  survey: lazy(() => import("./sections/survey.tsx")),
  integral: lazy(() => import("./sections/integral.tsx")),
  vector: lazy(() => import("./sections/vector.tsx")),
  analytic: lazy(() => import("./sections/analytic.tsx")),
  triangle: lazy(() => import("./sections/triangle.tsx")),
  combo: lazy(() => import("./sections/combo.tsx")),
  probability: lazy(() => import("./sections/probability.tsx")),
};

/** Lời dẫn nhỏ, tải ngay để tiêu đề và đoạn mở đầu hiện trước các hình. */
const LEADS: Record<string, [string, string]> = {
  quadratic: ["Muốn tìm đỉnh parabol, bạn có thể thuộc công thức $-\\frac{b}{2a}$, hoặc để một thuật toán tự mò đáy rồi so với công thức. Dưới đây là cả hai, và một mạng nơ-ron học lại đường parabol từ các điểm mẫu.", "To find the vertex of a parabola you can memorise the formula $-\\frac{b}{2a}$, or let an algorithm feel its way to the bottom and compare with the formula. Below are both, plus a neural network that relearns the parabola from sample points, and a tour of shape, completing the square, roots, signs and intervals."],
  ineq: ["Bất đẳng thức nói «không thể thấp hơn». Bản đồ dấu cho thấy hiệu hai vế chưa bao giờ âm, hình học (nửa đường tròn, hình chữ nhật, vectơ) cho thấy vì sao, thuật toán leo đồi tìm đúng dấu bằng, và phép thử ngẫu nhiên nhắc rằng thử số không thay được chứng minh.", "An inequality says «it cannot be lower». The sign map shows the difference of the two sides is never negative, geometry (the semicircle, rectangles, vectors) shows why, the hill-climbing algorithm finds the exact equality case, and random testing reminds us that testing numbers cannot replace a proof."],
  exp: ["Hàm mũ là «nhân lặp». Ta đếm thừa số để hiểu các quy tắc lũy thừa, dùng thước logarit để thấy logarit biến nhân thành cộng, soi gương hàm mũ và logarit, mô phỏng phân rã phóng xạ, giải phương trình mũ, rồi xem mạng nơ-ron học dáng bùng nổ của hàm mũ.", "The exponential function is «repeated multiplication». We count factors to understand the laws of exponents, use a slide rule to see logarithms turn multiplication into addition, mirror the exponential and the logarithm, simulate radioactive decay, solve exponential equations, then watch a neural network learn the explosive shape of the exponential."],
  sequence: ["Dãy số là danh sách có thứ tự; tổng là việc cộng dồn. Ta ghép hai hàng để cộng cấp số cộng, đua cộng đều với nhân đều, lần theo mạng nhện của dãy truy hồi, và chứng minh bằng quy nạp. Máy tính chỉ làm được hữu hạn bước, nên nó cộng dồn từng miếng và xem tổng có chịu dừng lại không.", "A sequence is an ordered list and a sum is an accumulation. We pair two rows to add an arithmetic sequence, race adding against multiplying, follow the cobweb of a recurrence, and prove by induction. A computer can only do finitely many steps, so it adds piece by piece and checks whether the total is willing to settle."],
  trig: ["Sin và cos không phải bảng số phải thuộc. Chúng sinh ra từ việc đi vòng quanh một đường tròn, và mạng nơ-ron học được dáng sóng ấy từ các điểm mẫu.", "Sine and cosine are not tables to memorise. They are born from going around a circle, and a neural network can learn the shape of that wave from sample points."],
  limit: ["Giới hạn là lời hứa về sai số: bạn đưa sai số bao nhiêu thì tôi chỉ ra được đoạn dãy nằm trong sai số đó. Ta phóng to những chỗ lỗ hổng, so tốc độ co của tử và mẫu, kẹp đường cong giữa hai bức tường, tìm tiệm cận, và chia đôi để bắt nghiệm.", "A limit is a promise about error: whatever error you name, I can point to a stretch of the sequence inside it. We zoom in on holes, compare how fast numerator and denominator shrink, squeeze a curve between two walls, find asymptotes, and use bisection to catch roots."],
  derivative: ["Đạo hàm là độ dốc của cát tuyến khi bước nhảy co lại. Ta cho máy làm đúng phép co ấy, rồi dùng độ dốc để lăn bóng xuống đáy.", "The derivative is the slope of a secant as the jump shrinks. We make the machine do exactly that shrinking, and then use the slope to roll a ball down to the bottom."],
  survey: ["Khảo sát hàm số là đọc bản đồ: độ dốc bằng 0 là nơi quay đầu. Máy tự lập bảng biến thiên, phân loại hàm bậc ba và trùng phương, đếm nghiệm khi tham số chạy, lăn bóng tìm cực tiểu cục bộ, và một mạng nơ-ron học lại đồ thị bậc ba.", "Studying a function is reading a map: slope 0 is where the curve turns. The machine builds the variation table by itself, classifies cubics and biquadratics, counts solutions as the parameter runs, rolls a ball to find local minima, and a neural network relearns the cubic graph."],
  integral: ["Tích phân là cộng vô số dải mỏng. Máy chỉ cộng được hữu hạn dải, và ta nhìn nó dồn về giá trị mà nguyên hàm cho ngay.", "An integral is adding countless thin strips. A machine can only add finitely many, and we watch the sum settle at the value that the antiderivative gives at once."],
  vector: ["Vectơ là chỉ dẫn di chuyển; cộng nối đuôi cho trọng tâm, tích vô hướng đo hai hướng ăn khớp đến đâu (một nơ-ron làm đúng phép ấy). Ma trận là một phép biến đổi mặt phẳng với định thức là hệ số đổi diện tích, và một lớp nơ-ron chỉ là ma trận cộng một phép gấp.", "A vector is an instruction to move; adding end to end gives the centroid, and the dot product measures how well two directions agree (one neuron does exactly that). A matrix is a transformation of the plane whose determinant is the area scale factor, and a layer of neurons is just a matrix plus a fold."],
  analytic: ["Đường thẳng được xác định bởi pháp tuyến. Ta đi từ một đường thẳng, hai đường thẳng, đường tròn, rồi lên mặt phẳng và mặt cầu trong không gian. Một nơ-ron học tìm đường thẳng ngăn cách hai nhóm điểm sẽ tự tìm ra pháp tuyến, và khoảng cách đến đường thẳng là phép chiếu lên pháp tuyến.", "A line is determined by its normal. We go from one line to two lines, then to the circle, and up to planes and spheres in space. A neuron learning to separate two groups of points finds the normal by itself, and the distance to a line is a projection onto the normal."],
  triangle: ["Công thức diện tích và thể tích kiểm được bằng thực nghiệm: ném điểm ngẫu nhiên và đếm tỉ lệ rơi vào hình. Ta còn dựng bốn tâm của tam giác bằng toạ độ, chứng minh Pythagore bằng cắt ghép, đếm ô vuông cho đồng dạng, chồng đĩa cho Archimedes, trải vỏ nón và ném điểm vào khối.", "Area and volume formulas can be checked by experiment: throw random points and count the share that land in the shape. We also build the four centres of a triangle from coordinates, prove Pythagoras by cutting and fitting, count squares for similarity, stack discs for Archimedes, unroll a cone, and throw points into a solid."],
  combo: ["Đếm là liệt kê. Máy liệt kê rất nhanh, nhưng chỉ đến một giới hạn; công thức giúp đếm mà không liệt kê. Ta khai triển nhị thức bằng cách nhân từng ngoặc, và xem trung bình, trung vị, tứ phân vị, phương sai phản ứng thế nào với một giá trị lạ và với số liệu ghép nhóm.", "Counting is listing. The machine lists very fast but only up to a limit; formulas let us count without listing. We expand binomials by multiplying one bracket at a time, and see how the mean, median, quartiles and variance react to an odd value and to grouped data."],
  probability: ["Xác suất là điều xảy ra khi lặp lại thật nhiều lần. Ta vừa đếm bằng lập luận vừa chạy mô phỏng, rồi so hai bên: công thức Bayes bằng diện tích, phân phối nhị thức, nghịch lí ngày sinh, luật số lớn và hình chuông xuất hiện khi cộng nhiều xúc xắc.", "Probability is what happens when you repeat something a very large number of times. We count by reasoning and also run simulations, then compare the two: Bayes' formula as areas, the binomial distribution, the birthday paradox, the law of large numbers, and the bell shape that appears when adding many dice."],
};

export default function FromZero({ topicId }: { topicId: string }) {
  const tt = useTx();
  const lead = LEADS[topicId];
  const Parts = PARTS[topicId];
  if (!lead || !Parts) return null;
  return (
    <section className="fz" aria-labelledby="fz-title">
      <h2 id="fz-title">{tt("Suy từ số 0: tự tay chạy thuật toán", "From zero: run the algorithms yourself")}</h2>
      <p className="fz-lead"><MathText text={tt(lead[0], lead[1])} /></p>
      <Suspense fallback={<p className="loading">{tt("Đang mở các hình…", "Opening the figures…")}</p>}>
        <Parts />
      </Suspense>
      <TopicLinks topicId={topicId} />
      <BridgeFigures topicId={topicId} />
    </section>
  );
}
