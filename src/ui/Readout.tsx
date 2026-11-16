import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { toTex } from "../lib/tex.ts";
import { MathText } from "./MathText.tsx";

function plain(children: ReactNode): string | null {
  let out = "";
  for (const child of Children.toArray(children)) {
    if (typeof child === "string" || typeof child === "number") out += String(child);
    else return null;
  }
  return out;
}

function dress(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<{ children?: ReactNode }>;
    if (element.type === "dt" || element.type === "dd") {
      const text = plain(element.props.children);
      if (text === null || text.trim() === "") return element;
      return cloneElement(element, undefined, <MathText text={toTex(text.replace(/\s+/g, " ").trim())} />);
    }
    if (element.props.children === undefined) return element;
    return cloneElement(element, undefined, dress(element.props.children));
  });
}

/** The lab readout grid: every label and value goes through KaTeX instead of plain text. */
export function Readout({ children }: { children: ReactNode }) {
  return <dl className="readout">{dress(children)}</dl>;
}
