import { spaceFigures } from "./space.ts";
import { spaceFigures2 } from "./space2.ts";
import { spaceConic } from "./spaceConic.ts";

/** Mọi hình vẽ không gian, khóa là "<lớp>/<mã bài>". */
export const allSpaceFigures = { ...spaceFigures, ...spaceFigures2, ...spaceConic };
