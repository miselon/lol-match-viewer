import axios from "axios";
import { LoLRegion } from "../domain/LolRegion";
import { RiotRouting } from "../domain/RiotRouting";
import { PUUID } from "../domain/PUUID";
import { MatchId } from "../domain/MatchId";


export class RiotApiClient {
    
    private static instance: RiotApiClient

    private constructor (private apiKey: string) {}

    public static getInstance(): RiotApiClient {

        if (!RiotApiClient.instance) {

            RiotApiClient.instance = new RiotApiClient(process.env.RIOT_API_KEY!);
        }

        return RiotApiClient.instance;
    }


    async getSummonersPuuid(summonerName: string, region: LoLRegion, routing: RiotRouting): Promise<PUUID> {

        const res = await axios.get(
            `https://${routing}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(summonerName)}/${encodeURIComponent(region)}`,
            this.createRequestConfig()
        )

        return PUUID.of(res.data.puuid)
    }

    async getRecentMatches(puuid: PUUID, count: number, routing: RiotRouting): Promise<MatchId[]> {

        const res = await axios.get(
            `https://${routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
            this.createRequestConfig()
        )

        return res.data
    }

    async getMatchDetails(matchId: MatchId, routing: RiotRouting): Promise<MatchDetailsApiResponse> {

        const res = await axios.get(
            `https://${routing}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            this.createRequestConfig()
        )

        return {
            gameEndTimestamp: res.data.info.gameEndTimestamp,
            gameMode: res.data.info.gameMode,
            gameType: res.data.info.gameType,
            participants: res.data.info.participants.map(
                (p: any) => ({
                        puuid: p.puuid,
                        championName: p.championName,
                        role: p.role,
                        kills: p.kills,
                        deaths: p.deaths,
                        assists: p.assists,
                    })
                )
        }
    }

    private createRequestConfig() {

        return { headers: { "X-Riot-Token": this.apiKey } }
    }
}


export interface MatchDetailsApiResponse {

    gameEndTimestamp: string
    gameMode: string
    gameType: string
    participants: ParticipantDto[]
}

export interface ParticipantDto {

    puuid: string
    championName: string
    role: string
    kills: number
    deaths: number
    assists: number
}