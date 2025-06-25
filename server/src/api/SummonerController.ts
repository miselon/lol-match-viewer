import { Router, Request, Response } from "express";
import { SummonerService } from "../application/SummonerService";

export function createSummonerController(service: SummonerService): Router {

  const router = Router();

  router.get("/matches/:name", async (request: Request, response: Response) => {

    const name = request.params.name;
    const count = parseInt(request.query.count as string) || 5;

    try {
      const matchIds = await service.getRecentMatchesByName(name, count);
      response.json(matchIds);

    } catch (error) {

      console.error(error);
      response.status(500).json({ error: "Failed to fetch matches" });
    }
  });

  return router;
}
