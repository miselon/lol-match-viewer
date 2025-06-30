import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { MatchesService } from "./application/MatchesService";
import { createMatchListController } from "./api/MatchListController";
import { createMatchDetailsController } from "./api/MatchDetailsController";
import { RestApiMatchesRepository } from "./infrastructure/RestApiMatchesRepository";
import { RestApiSummonerRepository } from "./infrastructure/RestApiSummonerRepository";

dotenv.config();

const app = express();
app.use(cors());

const matchesService = new MatchesService(new RestApiSummonerRepository(), new RestApiMatchesRepository());

app.use("/api",
  createMatchListController(matchesService),
  createMatchDetailsController(matchesService),
);

const port = process.env.PORT!;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
