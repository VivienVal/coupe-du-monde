export class Team {
	nbMatchsJoues: number
	points: number
	name: string;
	poule: string

	constructor(name: string, poule: string){
		this.name = name;
		this.points = 0;
		this.nbMatchsJoues = 0;
		this.poule = poule;
	}
}