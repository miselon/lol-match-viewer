import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api'

@Injectable({
    providedIn: 'root'
})
export class MatchesService {

    constructor(private httpClient: HttpClient) {}

    getMatchList(region: string, summonerName: string): Observable<MatchListDto[]> {

        const url = `${API_URL}/matches/${region}/${summonerName}`

        return this.httpClient.get<MatchListDto[]>(url);
    }

    getMatchDetails(region: string, matchId: string): Observable<MatchDetailsDto> {

        const url = `${API_URL}/match/${region}/${matchId}`

        return this.httpClient.get<MatchDetailsDto>(url);
    }
}

export interface MatchListDto {

    matchId: string
    queue: string
    championImageUrl: string
    championName: string
    role: string
    date: number
    result: string
    kda: string
}

export interface MatchDetailsDto {

    gameDuration: number;
    gameMode: string;
    gameType: string;
    participants: ParticipantDto[];
}

export interface ParticipantDto {

    puuid: string;
    championImageUrl: string
    championName: string;
    championLevel: number;
    role: string;
    lane: string;

    kills: number;
    deaths: number;
    assists: number;
    win: boolean;

    totalCS: number;
    goldEarned: number;
    damageDealt: number;
    visionScore: number;

    summonerSpells: string[];  // spell IDs or names
    runes: string[];           // rune IDs or names
    items: string[];           // item IDs or names
}