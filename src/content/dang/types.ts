/** Một bước: khẳng định và lý do. Không viết bước không có lý do. */
export type ReasonStep = {
  claim: string;
  why: string;
};

export type Check = {
  /** Biểu thức SymPy. */
  expr: string;
  /** Giá trị đúng, cũng là SymPy. */
  expect: string;
};

export type Worked = {
  prompt: string;
  steps: ReasonStep[];
  ket: string;
  check?: Check;
};

export type Drill = {
  prompt: string;
  /** Hiện trước lời giải. */
  think: string;
  answer: string;
  steps: ReasonStep[];
  check?: Check;
  kind: "thuc-te" | "tu-ra-de" | "luyen";
};

/** Một dạng bài trong chủ đề. */
export type Dang = {
  name: string;
  nhanDang: string;
  phuongPhap: string;
  viDu: Worked;
  loi: string;
  luyen: Drill;
};

export type TopicDang = {
  id: string;
  title: string;
  dang: Dang[];
  sangTao: Drill[];
};
