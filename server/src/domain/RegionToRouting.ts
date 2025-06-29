import { LoLRegion } from "./LolRegion";
import { RiotRouting } from "./RiotRouting";

export class RegionToRouting {

    private static regionToRouting: Record<LoLRegion, RiotRouting> = {
        [LoLRegion.NA]: RiotRouting.AMERICAS,
        [LoLRegion.BR]: RiotRouting.AMERICAS,
        [LoLRegion.LAN]: RiotRouting.AMERICAS,
        [LoLRegion.LAS]: RiotRouting.AMERICAS,
        [LoLRegion.EUW]: RiotRouting.EUROPE,
        [LoLRegion.EUNE]: RiotRouting.EUROPE,
        [LoLRegion.TR]: RiotRouting.EUROPE,
        [LoLRegion.RU]: RiotRouting.EUROPE,
        [LoLRegion.KR]: RiotRouting.ASIA,
        [LoLRegion.JP]: RiotRouting.ASIA,
        [LoLRegion.OCE]: RiotRouting.AMERICAS,
    };

    static getRouting(lolRegion: LoLRegion): RiotRouting {

        return this.regionToRouting[lolRegion]
    }
}

