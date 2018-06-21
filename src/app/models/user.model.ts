export class User {

	userName: string;
	login: string
	nbPoints: number;
	type: string

	constructor(userName: string, login: string){
		this.userName = userName;
		this.nbPoints = 0;
		this.type = 'user';
		this.login = login;
	}
}