import { MatchId } from "../domain/MatchId"

export interface MatchListDto {

    matchId: MatchId
    queue: string
    championImageUrl: string
    championName: string
    role: string
    result: string
    kda: string
}