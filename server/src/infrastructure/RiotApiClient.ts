import axios, { AxiosResponse } from "axios";
import { LoLRegion } from "../domain/LolRegion";
import { RiotRouting } from "../domain/RiotRouting";
import { PUUID } from "../domain/PUUID";
import { MatchId } from "../domain/MatchId";
import { createMatchDetailsDto } from "./RiotApiResponseTransformer";
import { MatchDetailsDto } from "../application/MatchDetailsDto";


export class RiotApiClient {

    // Quick and dirty cache to avoid Riot's rate limits
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

    async getMatchDetails(matchId: MatchId, routing: RiotRouting): Promise<MatchDetailsDto> {

        const url = `${this.createBaseUrl(routing)}/lol/match/v5/matches/${encodeURIComponent(matchId.toString())}`

        const response = await this.fetchWithCache(url)

        return createMatchDetailsDto(response)
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