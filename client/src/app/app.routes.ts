import { Routes } from '@angular/router';
import { Search } from './views/search/search';
import { MatchList } from './views/match-list/match-list';
import { MatchDetails } from './views/match-details/match-details';

export const routes: Routes = [
  { path: '', component: Search },
  { path: 'matches/:region/:summonerName', component: MatchList },
  { path: 'match/:region/:matchId', component: MatchDetails }
];
