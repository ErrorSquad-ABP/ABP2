import { Request, Response } from "express";
import { balcarPool, furnasPool, simaPool } from "../../configs/db";
import { pingDatabases } from "../../application/health/pingDatabases";

export const health = async (_req: Request, res: Response): Promise<void> => {
  const summary = await pingDatabases({
    furnas: furnasPool,
    sima: simaPool,
    balcar: balcarPool,
  });

  const uptimeSec = Math.floor(process.uptime());
  const memory = process.memoryUsage();

  const body = {
    success: summary.ok,
    status: summary.ok ? "ok" : "degraded",
    uptimeSec,
    memory: {
      rss: memory.rss,
      heapUsed: memory.heapUsed,
      heapTotal: memory.heapTotal,
    },
    dependencies: summary.dependencies,
  };

  res.status(summary.ok ? 200 : 503).json(body);
};
