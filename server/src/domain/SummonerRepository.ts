import { LoLRegion } from "./LolRegion";

export interface SummonerRepository {

  getSummonersPuuid(summonerName: string, region: LoLRegion): Promise<PUUID>;
}