import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrl: './search.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})

export class Search {

  summonerName = '';
  region = 'EUNE';
  regions = ['NA', 'EUW', 'EUNE', 'KR'];

  constructor(private router: Router) {}

  search() {

    if (this.summonerName.trim()) {

      this.router.navigate(['/matches', this.region.toLowerCase(), this.summonerName]);
    }
  }
}
