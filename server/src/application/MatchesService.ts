import { MatchesRepository } from "../domain/MatchesRepository";
import { SummonerRepository } from "../domain/SummonerRepository";
import { LoLRegion } from "../domain/LolRegion";
import { MatchId } from "../domain/MatchId";
import { MatchListDto } from "./MatchListDto";
import { MatchDetailsDto } from "./MatchDetailsDto";

export class MatchesService {

  constructor(
    private summonerRepostiory: SummonerRepository,
    private matchesRepository: MatchesRepository) {}

  async getRecentMatches(summonerName:string, region:LoLRegion): Promise<MatchListDto[]> {

    const puuid = await this.summonerRepostiory.getSummonersPuuid(summonerName, region)

    return this.matchesRepository.getRecentMatches(puuid, region)
  }

  async getMatchDetails(matchId:MatchId, region:LoLRegion): Promise<MatchDetailsDto> {

    return this.matchesRepository.getMatchDetails(matchId, region)
  }
}