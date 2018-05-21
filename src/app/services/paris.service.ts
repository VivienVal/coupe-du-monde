import { Injectable } from '@angular/core';
import { Pari } from '../models/pari.model';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs/subject';

@Injectable({
  providedIn: 'root'
})
export class ParisService {

  matchs = [
  	new Match(new Team('France'), new Team('Belgique'), new Date('December 17, 1995 03:24:00')),
  	new Match(new Team('Angleterre'), new Team('Allemagne'), new Date('December 14, 1995 03:24:00'))
  ];
  parisSubject = new Subject<Pari[]>();
  paris = [
  	new Pari(this.matchs[0], 3, 0, 'test'),
  	new Pari(this.matchs[1], 0, 1, 'test')
  ];

  constructor() { }

  emitParis(){
  	this.parisSubject.next(this.paris);
  }
}
