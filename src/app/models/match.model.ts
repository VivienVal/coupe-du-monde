import { Team } from './team.model';

export class Match {

	equipeA: Team;
	equipeB: Team;
	date: Date;
	scoreA: number;
	scoreB: number;

	constructor(equipeA: Team, equipeB: Team, date: Date){
		this.equipeA = equipeA;
		this.equipeB = equipeB;
		this.date = date;
	}
}