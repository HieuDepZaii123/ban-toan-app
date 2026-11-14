import { adaptCheck } from "../server/chat/nodeAdapter.ts";

type Req = Parameters<typeof adaptCheck>[0];
type Res = Parameters<typeof adaptCheck>[1];

export default function handler(req: Req, res: Res): Promise<void> {
  return adaptCheck(req, res);
}
