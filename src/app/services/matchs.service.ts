import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs/subject';

@Injectable({
  providedIn: 'root'
})
export class MatchsService {

  matchsSubject = new Subject<Match[]>();
  matchs = [
  	new Match(new Team('France'), new Team('Belgique'), new Date('December 17, 1995 03:24:00')),
  	new Match(new Team('Angleterre'), new Team('Allemagne'), new Date('December 14, 1995 03:24:00'))
  ];

  constructor() { }

  emitMatchs(){
  	this.matchsSubject.next(this.matchs);
  }
}
