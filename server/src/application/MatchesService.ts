import { LoLRegion } from "../domain/LolRegion";
import { MatchesRepository } from "../domain/MatchesRepository";
import { SummonerRepository } from "../domain/SummonerRepository";
import { MatchListDto } from "./MatchListDto";

export class MatchesService {

  constructor(
    private summonerRepostiory: SummonerRepository,
    private matchesRepository: MatchesRepository) {}

  async getRecentMatches(summonerName:string, region:LoLRegion): Promise<MatchListDto[]> {

    const puuid = await this.summonerRepostiory.getSummonersPuuid(summonerName, region)

    return this.matchesRepository.getRecentMatches(puuid, region)
  }
}