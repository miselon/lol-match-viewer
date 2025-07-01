import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api'

@Injectable({
    providedIn: 'root'
})
export class MatchesService {

    constructor(private httpClient: HttpClient) {}

    getMatchList(region: string, summonerName: string): Observable<MatchListItem[]> {

        const url = `${API_URL}/matches/${region}/${summonerName}`

        return this.httpClient.get<MatchListItem[]>(url);
    }

    getMatchDetails(region: string, matchId: string): Observable<MatchDetails[]> {

        const url = `${API_URL}/match/${region}/${matchId}`

        return this.httpClient.get<MatchListItem[]>(url);
    }
}

export interface MatchListItem {

    matchId: string
    championName: string
    role: string
    date: number
    result: string
    kda: string
}

export interface MatchDetails {

    // TODO
}