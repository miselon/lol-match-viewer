import { MatchListDto } from "../application/MatchListDto";
import { MatchDetailsDto } from "../application/MatchDetailsDto";
import { LoLRegion } from "./LolRegion";
import { PUUID } from "../domain/PUUID";
import { MatchId } from "../domain/MatchId";

export interface MatchesRepository {
  
  getRecentMatches(puuid: PUUID, region: LoLRegion): Promise<MatchListDto[]>

  getMatchDetails(matchId: MatchId, region: LoLRegion): Promise<MatchDetailsDto>
}