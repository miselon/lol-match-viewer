import { MatchListDto } from "../application/MatchListDto";
import { MatchDetailsDto } from "../application/MatchDetailsDto";
import { LoLRegion } from "./LolRegion";

export interface MatchesRepository {
  
  getRecentMatches(puuid: PUUID, region: LoLRegion): Promise<MatchListDto[]>

  getMatchDetails(matchId: MatchId, region: LoLRegion): Promise<MatchDetailsDto>
}