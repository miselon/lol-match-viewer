import { LoLRegion } from "../domain/LolRegion";
import { RegionToRouting } from "../domain/RegionToRouting";
import { SummonerRepository } from "../domain/SummonerRepository";
import { RiotApiClient } from "./RiotApiClient";
import { PUUID } from "../domain/PUUID";

export class RestApiSummonerRepository implements SummonerRepository {

    private riotApiClient = RiotApiClient.getInstance()


    getSummonersPuuid(summonerName: string, region: LoLRegion): Promise<PUUID> {

        const routing = RegionToRouting.getRouting(region)

        return this.riotApiClient.getSummonersPuuid(summonerName, region, routing)
    }
}