import { Router, Request, Response } from "express";
import { MatchesService } from "../application/MatchesService";
import { LoLRegion } from "../domain/LolRegion";

export function createMatchListController(service: MatchesService): Router {

  const router = Router();

  router.get("/matches/:region/:name", async (request: Request, response: Response) => {

    const region = LoLRegion[request.params.region.toUpperCase() as keyof typeof LoLRegion];
    const name = request.params.name;

    try {
      const recentMatches = await service.getRecentMatches(name, region);
      response.json(recentMatches);

    } catch (error) {

      console.error(error);
      
      response.status(500).json({ error: "Failed to fetch matches" });
    }
  });

  return router;
}
