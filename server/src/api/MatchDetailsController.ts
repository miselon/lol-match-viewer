import { Router, Request, Response } from "express";
import { MatchesService } from "../application/MatchesService";
import { LoLRegion } from "../domain/LolRegion";
import { MatchId } from "../domain/MatchId";

export function createMatchDetailsController(service: MatchesService): Router {

  const router = Router();

  router.get("/match/:region/:matchId", async (request: Request, response: Response) => {

    const region = LoLRegion[request.params.region.toUpperCase() as keyof typeof LoLRegion];
    const matchId = MatchId.of(request.params.matchId);

    try {
      const matchDetails = await service.getMatchDetails(matchId, region);
      response.json(matchDetails);

    } catch (error) {

      console.error(error);
      
      response.status(500).json({ error: "Failed to fetch match details" });
    }
  });

  return router;
}