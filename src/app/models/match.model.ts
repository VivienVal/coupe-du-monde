import { Team } from './team.model';

export class Match {

	equipeA: Team;
	equipeB: Team;
	date: string;
	scoreA: number;
	scoreB: number;

	constructor(equipeA: Team, equipeB: Team, date: Date){
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		this.equipeA = equipeA;
		this.equipeB = equipeB;
		this.date = date.toLocaleString('fr-FR', options);
	}
}