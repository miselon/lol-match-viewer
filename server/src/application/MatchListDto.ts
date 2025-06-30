import { MatchId } from "../domain/MatchId"

export interface MatchListDto {

    matchId: MatchId
    championName: string
    role: string
    date: string
    result: string
    kda: string
}