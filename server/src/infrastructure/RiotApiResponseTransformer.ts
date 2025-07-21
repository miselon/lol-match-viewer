import { AxiosResponse } from "axios";
import { MatchDetailsDto } from "../application/MatchDetailsDto";
import { RiotAssetsRepository } from "./RiotAssetsRepository";

export function createMatchDetailsDto(response: AxiosResponse): MatchDetailsDto {

    const info = response.data.info;

    return {

        gameDuration: info.gameDuration,
        gameMode: info.gameMode,
        gameType: info.gameType,
        participants: info.participants.map((p: any) => ({

            puuid: p.puuid,
            championImageUrl: RiotAssetsRepository.getChampionImageUrl(p.championName),
            championName: p.championName,
            championLevel: p.champLevel,
            role: p.teamPosition || p.role || 'Unknown',
            lane: p.lane || 'Unknown',

            kills: p.kills,
            deaths: p.deaths,
            assists: p.assists,
            win: p.win,

            totalCS: (p.totalMinionsKilled || 0) + (p.neutralMinionsKilled || 0),
            goldEarned: p.goldEarned,
            damageDealt: p.totalDamageDealtToChampions,
            visionScore: p.visionScore,

            summonerSpells: [
                p.summoner1Id?.toString() || '',
                p.summoner2Id?.toString() || ''
            ].filter(s => s !== ''),

            runes: extractRuneNames(p.perks),

            items: [
                p.item0?.toString(),
                p.item1?.toString(),
                p.item2?.toString(),
                p.item3?.toString(),
                p.item4?.toString(),
                p.item5?.toString(),
                p.item6?.toString()
            ].filter(item => item && item !== '' && item !== '0')
        }))
    }
}

function extractRuneNames(perks: any): string[] {

    if (!perks || !perks.styles) return [];

    const runeIds: number[] = [];

    for (const style of perks.styles) {

        if (style.selections) {

            for (const sel of style.selections) {
                
                if (sel.perk) {
                    runeIds.push(sel.perk);
                }
            }
        }
    }

    return runeIds.map(id => id.toString());
}