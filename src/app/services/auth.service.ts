import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean;
  userName: string;
  authSubject = new Subject<string>();

  constructor() { }

  createNewUser(email: string, password: string){
  	return new Promise(
	  	(resolve, reject) => {
	  		firebase.auth().createUserWithEmailAndPassword(email, password).then(
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

  signInUser(email: string, password: string){
  	return new Promise(
	  	(resolve, reject) => {
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
	  		}
	  		else {
	  			this.isAuth = false;
          		this.userName = '';
          		this.authSubject.next('');
	  		}
	  	}
	);
  }
}
