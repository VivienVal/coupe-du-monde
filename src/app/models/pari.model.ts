import { Match } from './match.model';

export class Pari {
	match: Match;
	scoreA: number;
	scoreB: number;
	user: string;
	scorePari: number;

	constructor(match: Match, scoreA: number, scoreB: number, user: string){
		this.match = match;
		this.scoreA = scoreA;
		this.scoreB = scoreB;
		this.user = user;
		this.scorePari = 0;
	}
}