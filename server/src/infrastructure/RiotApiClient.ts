import axios, { AxiosResponse } from "axios";
import { LoLRegion } from "../domain/LolRegion";
import { RiotRouting } from "../domain/RiotRouting";
import { PUUID } from "../domain/PUUID";
import { MatchId } from "../domain/MatchId";


export class RiotApiClient {

    // Quick and dirty cache to avoid Riot's cache limits
    private cache: Record<string, AxiosResponse<any, any>> = {}
    
    private static instance: RiotApiClient

    private constructor (private apiKey: string) {}

    public static getInstance(): RiotApiClient {

        if (!RiotApiClient.instance) {

            RiotApiClient.instance = new RiotApiClient(process.env.RIOT_API_KEY!);
        }

        return RiotApiClient.instance;
    }


    async getSummonersPuuid(summonerName: string, region: LoLRegion, routing: RiotRouting): Promise<PUUID> {

        const url = `${this.createBaseUrl(routing)}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(summonerName)}/${encodeURIComponent(region)}`

        const response = await this.fetchWithCache(url)

        return PUUID.of(response.data.puuid)
    }

    async getRecentMatches(puuid: PUUID, count: number, routing: RiotRouting): Promise<MatchId[]> {

        const url = `${this.createBaseUrl(routing)}/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid.toString())}/ids?count=${count}`

        const response = await this.fetchWithCache(url)

        return response.data
    }

    async getMatchDetails(matchId: MatchId, routing: RiotRouting): Promise<MatchDetailsApiResponse> {

        const url = `${this.createBaseUrl(routing)}/lol/match/v5/matches/${encodeURIComponent(matchId.toString())}`

        const response = await this.fetchWithCache(url)

        return {
            gameEndTimestamp: response.data.info.gameEndTimestamp,
            gameMode: response.data.info.gameMode,
            gameType: response.data.info.gameType,
            participants: response.data.info.participants.map(
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

    private async fetchWithCache(url: string):Promise<AxiosResponse<any, any>> {

        const cachedResponse = this.cache[url]

        if (cachedResponse) {

            return Promise.resolve(cachedResponse)
        }

        const response = await axios.get(url, this.createRequestConfig())

        return this.cache[url] = response
    }

    private createBaseUrl(routing: RiotRouting) {

        return `https://${routing}.api.riotgames.com`
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