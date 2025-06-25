import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { RiotSummonerRepository } from "./infrastructure/RestApiSummonerRepository";
import { SummonerService } from "./application/SummonerService";
import { createSummonerController } from "./api/SummonerController";

dotenv.config();

const app = express();
app.use(cors());

const repo = new RiotSummonerRepository();
const service = new SummonerService(repo);
const summonerController = createSummonerController(service);

app.use("/api", summonerController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
