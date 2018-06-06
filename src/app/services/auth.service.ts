import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/subject';
import { User } from '../models/user.model';
import { ParisService } from './paris.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean;
  userName: string;
  authSubject = new Subject<string>();
  userTypeSubject = new Subject<string>();
  users = [];

  constructor(	private parisService: ParisService) { }

  createNewUser(email: string, password: string){
  	return new Promise(
	  	(resolve, reject) => {
	  		firebase.auth().createUserWithEmailAndPassword(email, password).then(
		  		() => {
	  				this.instanciateUser(email);	
		  			resolve();
		  		},
		  		(error) => {
		  			reject(error);
		  		}
  			);
  		}
  	);
  }

  signInUser(email: string, password: string){
  	return new Promise(
	  	(resolve, reject) => {
	  		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
	  			() => {
	  				firebase.auth().signInWithEmailAndPassword(email, password).then(
			  			() => {
			  				resolve();
			  			},
			  			(error) => {
			  				reject(error);
			  			}
		  			);
	  			}
	  		);
	  	}
	  );
  }

  signOutUser(){
  	firebase.auth().signOut();
  }

  checkAuth(){  
  	firebase.auth().onAuthStateChanged(
	  	(user) => {
	  		if (user){
	  			this.isAuth = true;
         	this.userName = user.email;
          this.authSubject.next(this.userName);
          this.userTypeSubject.next(this.findUserType(user.email));
	  		}
	  		else {
	  			this.isAuth = false;
          		this.userName = '';
          		this.authSubject.next('');
	  		}
	  	}
	);
  }

  findUserType(userName: string){
  	for (let user of this.parisService.users){
  		if (userName == user.userName){
  			return user.type;
  		}
  	}
  	return 'undefined';
  }

  instanciateUser(userName){
  	this.users = this.parisService.users;
  	const newUser = new User(userName);
  	this.users.push(newUser);
  	firebase.database().ref('/users').set(this.users);
  	this.parisService.emitUsers();
  }
}
