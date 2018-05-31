export class User {

	userName: string;
	nbPoints: number;
	type: string

	constructor(userName: string){
		this.userName = userName;
		this.nbPoints = 0;
		this.type = 'user';
	}
}