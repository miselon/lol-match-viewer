import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatchesService, MatchListItem } from '../../services/matches';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-match-list',
    imports: [
        CommonModule,
        MatTableModule
    ],
    templateUrl: './match-list.html',
    styleUrl: './match-list.scss'
})

export class MatchList {

    columnsToDisplay: string[] = ['index', 'championName', 'role', 'kda', 'result'];

    matchList: MatchListItem[] = []
    summonerName = ''
    region = ''

    constructor(
        private route: ActivatedRoute,
        private matchesService: MatchesService,
        private changeDetector: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit() {

        this.route.paramMap.subscribe(params => {

            this.summonerName = params.get('summonerName')!
            this.region = params.get('region')!

            this.fetchMatchList()
        });
    }

    goToMatchDetails(matchId: string) {

        this.router.navigate(['/match', this.region, matchId])
    }

    private fetchMatchList() {

        this.matchesService.getMatchList(this.region, this.summonerName)
            .subscribe({
                next: (matchList) => {
                    this.matchList = matchList
                    this.changeDetector.markForCheck()
                },
                error: (error) => {
                    // TODO global error handling
                    console.log(error)
                }
            })
    }
}
