import { MatchDetailsDto } from "../application/MatchDetailsDto";
import { MatchListDto } from "../application/MatchListDto";
import { LoLRegion } from "../domain/LolRegion";
import { PUUID } from "../domain/PUUID";
import { MatchId } from "../domain/MatchId";
import { MatchesRepository } from "../domain/MatchesRepository";
import { RegionToRouting } from "../domain/RegionToRouting";
import { RiotRouting } from "../domain/RiotRouting";
import { RiotApiClient } from "./RiotApiClient";
import { RiotAssetsRepository } from "./RiotAssetsRepository";


export class RestApiMatchesRepository implements MatchesRepository {

    private riotApiClient = RiotApiClient.getInstance()


    async getRecentMatches(puuid: PUUID, region: LoLRegion): Promise<MatchListDto[]> {

        const routing = RegionToRouting.getRouting(region)

        const matchIds = await this.riotApiClient.getRecentMatches(puuid, 10, routing)

        return Promise.all(
            matchIds.map( matchId => this.getMatchListDto(puuid, matchId, routing) )
        )
    }

    async getMatchDetails(matchId: MatchId, region: LoLRegion): Promise<MatchDetailsDto> {

        const routing = RegionToRouting.getRouting(region)

        return this.riotApiClient.getMatchDetails(matchId, routing)
    }

    private async getMatchListDto(puuid: PUUID, matchId: MatchId, routing: RiotRouting): Promise<MatchListDto> {

        const matchDetails = await this.riotApiClient.getMatchDetails(matchId, routing)

        const mainParticipant = matchDetails.participants
            .find( participant => participant.puuid === puuid.getValue() )!

        const camelCaseChampionName = mainParticipant.championName
        
        return {
            matchId: matchId,
            queue: matchDetails.gameMode,
            championImageUrl: RiotAssetsRepository.getChampionImageUrl(camelCaseChampionName),
            championName: this.getChampionDisplayName(camelCaseChampionName),
            role: mainParticipant.role,
            result: mainParticipant.win ? 'WIN' : 'LOSS',
            kda: `${mainParticipant.kills}/${mainParticipant.deaths}/${mainParticipant.assists}`
        }
    }

    private getChampionDisplayName(camelCaseChampionName: string): string {

        return camelCaseChampionName.split(/(?=[A-Z])/).join(' ');
    }
}