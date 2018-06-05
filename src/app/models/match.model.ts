import { Team } from './team.model';

export class Match {

	equipeA: Team;
	equipeB: Team;
	date: Date;
	scoreA: number;
	scoreB: number;
	intDate: number;
	poule: string;

	constructor(equipeA: Team, equipeB: Team, date: string, poule: string){
		this.equipeA = equipeA;
		this.equipeB = equipeB;
		this.date = new Date(date);
		this.poule = poule;
	}
}