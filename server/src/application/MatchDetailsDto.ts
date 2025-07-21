export interface MatchDetailsDto {

    gameDuration: number
    gameMode: string
    gameType: string
    participants: ParticipantDto[]
}

export interface ParticipantDto {

    puuid: string
    championImageUrl: string
    championName: string
    championLevel: number
    role: string
    lane: string

    kills: number
    deaths: number
    assists: number
    win: boolean

    totalCS: number
    goldEarned: number
    damageDealt: number
    visionScore: number

    summonerSpells: string[]
    runes: string[]
    items: string[]
}