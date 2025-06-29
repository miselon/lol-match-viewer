import { Router, Request, Response } from "express";
import { MatchesService } from "../application/MatchesService";

// TODO

// export function createMatchListController(service: MatchesService): Router {

//   const router = Router();

//   router.get("/matches/:region/:name", async (request: Request, response: Response) => {

//     const region = request.params.name;
//     const name = request.params.name;

//     const count = parseInt(request.query.count as string) || 10;

//     try {
//       const matchIds = await service.getRecentMatchesByName(name, count);
//       response.json(matchIds);

//     } catch (error) {

//       console.error(error);
//       response.status(500).json({ error: "Failed to fetch matches" });
//     }
//   });

//   return router;
// }
