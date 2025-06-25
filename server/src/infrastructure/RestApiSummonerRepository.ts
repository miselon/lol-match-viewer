import axios from "axios";
import { SummonerRepository } from "../domain/SummonerRepository";
import { Summoner } from "../domain/Summoner";

const API_KEY = process.env.RIOT_API_KEY!;
const REGION = "eun1";
const MATCH_REGION = "europe";

export class RiotSummonerRepository implements SummonerRepository {

  async getByName(name: string): Promise<Summoner> {

    const res = await axios.get(
      `https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`,
      { headers: { "X-Riot-Token": API_KEY } }
    );

    const data = res.data;

    return {
      name: data.name,
      puuid: data.puuid,
      summonerId: data.id,
    };
  }

  async getRecentMatches(puuid: string, count: number): Promise<string[]> {

    const res = await axios.get(
      `https://${MATCH_REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`,
      {
        headers: { "X-Riot-Token": API_KEY },
        params: { start: 0, count },
      }
    );

    return res.data;
  }
}