export class Team {
	nbMatchsJoues: number
	points: number
	name: string;

	constructor(name: string){
		this.name = name;
		this.points = 0;
		this.nbMatchsJoues = 0;
	}
}