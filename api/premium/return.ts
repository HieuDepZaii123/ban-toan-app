import { adaptNode } from "../../server/pay/nodeAdapter.ts";

type Req = Parameters<typeof adaptNode>[0];
type Res = Parameters<typeof adaptNode>[1];

export default function handler(req: Req, res: Res): Promise<void> {
  return adaptNode(req, res);
}
