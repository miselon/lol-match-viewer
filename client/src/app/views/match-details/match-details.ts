import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchDetailsDto, ParticipantDto } from '../../services/matches'; // your DTO file
import { MatchesService } from '../../services/matches'; // your service
import { CommonModule } from '@angular/common';
import { ParticipantCard } from '../../components/participant-card/participant-card';

@Component({
    selector: 'app-match-details',
    standalone: true,
    imports: [CommonModule, ParticipantCard],
    templateUrl: './match-details.html',
    styleUrls: ['./match-details.scss'],
})
export class MatchDetails {

    region = ''
    matchId = ''
    matchDetails?: MatchDetailsDto
    winners: ParticipantDto[] = []
    losers: ParticipantDto[] = []

    constructor(
        private route: ActivatedRoute,
        private matchService: MatchesService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {

        this.route.paramMap.subscribe(params => {

            this.region = params.get('region')!
            this.matchId = params.get('matchId')!;

            this.fetchMatchDetails();
        });
    }

    async fetchMatchDetails() {

        this.matchService.getMatchDetails(this.region, this.matchId)
            .subscribe({
                next: (matchDetails) => {

                    this.matchDetails = matchDetails
                    this.winners = matchDetails.participants.filter(participant => participant.win)
                    this.losers = matchDetails.participants.filter(participant => !participant.win)

                    this.changeDetector.markForCheck()
                },
                error: (error) => {
                    // TODO global error handling
                    console.log(error)
                }
            })
    }
}