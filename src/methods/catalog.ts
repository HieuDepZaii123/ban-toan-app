import raw from "./methods.json" with { type: "json" };

export type MethodLink = { href: string; label: string };
export type Worked = { id: string; title: string; prompt: string; steps: string[]; result: string };
export type PracticeItem = { id: string; prompt: string; answer: string; steps: string[] };
export type VerifyRow = { where: string; lhs: string; rhs: string };
export type GuideRow = { when: string; methodId: string; topicHref: string; topicLabel: string };

export type Method = {
  id: string;
  title: string;
  titleEn: string;
  blurb: string;
  spot: string[];
  thinking: string[];
  care: string[];
  formulas: string[];
  examples: Worked[];
  mistakes: string[];
  practice: PracticeItem[];
  links: MethodLink[];
  verify: VerifyRow[];
};

export type MethodsFile = {
  title: string;
  titleEn: string;
  lead: string;
  leadEn: string;
  guide: GuideRow[];
  methods: Method[];
};

export const methodsData = raw as MethodsFile;

export function methodById(id: string): Method | undefined {
  return methodsData.methods.find((item) => item.id === id);
}
