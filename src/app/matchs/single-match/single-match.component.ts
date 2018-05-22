import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { Pari } from '../../models/pari.model';
import { MatchsService} from '../../serviceS/matchs.service';

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})
export class SingleMatchComponent implements OnInit {

  match: Match;
  pari: Pari;

  constructor() { }

  ngOnInit() {
  }

}
