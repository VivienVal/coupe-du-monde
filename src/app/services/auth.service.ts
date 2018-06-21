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
  userType: string;

  constructor(private parisService: ParisService) { }

  createNewUser(email: string, password: string, login: string){
  	return new Promise(
	  	(resolve, reject) => {
	  		firebase.auth().createUserWithEmailAndPassword(email, password).then(
		  		() => {
	  				this.instanciateUser(email, login);	
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
          this.emitAuth();
          this.emitUserType();
	  		}
	  		else {
	  			this.isAuth = false;
          		this.userName = '';
          		this.authSubject.next('');
	  		}
	  	}
	  );
  }

  emitAuth(){    
    this.authSubject.next(this.userName);
  }

  emitUserType(){
    this.userTypeSubject.next(this.userType);
  }

  findUserType(userName: string){
    if(this.parisService.users.length == 0){
      this.parisService.getUsers().then(
        (valid: string) => {          
          this.searchUser(userName);
        }
      );
    }
    else {
      this.searchUser(userName);
    }
  }

  searchUser(userName: string){
  	for (let user of this.parisService.users){
  		if (userName == user.userName){
        this.userType = user.type;
        this.emitUserType();
  			return user.type;
  		}
  	}
    this.userType = 'undefined';
    this.emitUserType();
  	return 'undefined';
  }

  instanciateUser(userName, login: string){
  	const newUser = new User(userName, login);
  	this.parisService.users.push(newUser);
  	firebase.database().ref('/users').set(this.parisService.users);
  	this.parisService.emitUsers();
  }
}
