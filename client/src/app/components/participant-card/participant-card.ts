import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ParticipantDto } from '../../services/matches'

@Component({
    selector: 'app-participant-card',
    imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule],
    templateUrl: './participant-card.html',
    styleUrl: './participant-card.scss'
})
export class ParticipantCard {

    @Input({ required: true }) participant!: ParticipantDto

    getItemIcon(itemId: string) {
        return `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/item/${itemId}.png`
    }

    getSummonerSpellIcon(spellId: string) {
        return `https://ddragon.leagueoflegends.com/cdn/15.13.1/img/spell/${spellId}.png`
    }

    getRuneIcon(runeId: string) {

        return `assets/runes/${runeId}.png`
    }

    // Optional: Map summoner spell ID to human-readable name
    getSummonerSpellName(spellId: string) {
        const map: Record<string, string> = {
            '21': 'Barrier',
            '1': 'Cleanse',
            '14': 'Ignite',
            '3': 'Exhaust',
            '4': 'Flash',
            '6': 'Ghost',
            '7': 'Heal',
            '13': 'Clarity',
            '11': 'Smite',
            '12': 'Teleport',
            // Add more if needed
        }
        return map[spellId] || spellId
    }
}
