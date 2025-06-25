import { Summoner } from "./Summoner";

export interface SummonerRepository {

  getByName(name: string): Promise<Summoner>;
  
  getRecentMatches(puuid: string, count: number): Promise<string[]>;
}