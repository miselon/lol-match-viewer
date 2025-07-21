export class RiotAssetsRepository {

    static getChampionImageUrl(camelCaseChampionName: string): string {

        return `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/champion/${camelCaseChampionName}.png`
    }
}