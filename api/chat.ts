import { adaptChat } from "../server/chat/nodeAdapter.ts";

type Req = Parameters<typeof adaptChat>[0];
type Res = Parameters<typeof adaptChat>[1];

export default function handler(req: Req, res: Res): Promise<void> {
  return adaptChat(req, res);
}
