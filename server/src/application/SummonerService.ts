import { SummonerRepository } from "../domain/SummonerRepository";

export class SummonerService {
    
  constructor(private summonerRepository: SummonerRepository) {}

  async getRecentMatchesByName(name: string, count: number = 5): Promise<string[]> {

    const summoner = await this.summonerRepository.getByName(name);

    return await this.summonerRepository.getRecentMatches(summoner.puuid, count);
  }
}