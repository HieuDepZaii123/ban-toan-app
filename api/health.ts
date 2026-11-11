import { adaptHealth } from "../server/http/health.ts";

type Req = Parameters<typeof adaptHealth>[0];
type Res = Parameters<typeof adaptHealth>[1];

export default function handler(req: Req, res: Res): Promise<void> {
  return adaptHealth(req, res);
}
