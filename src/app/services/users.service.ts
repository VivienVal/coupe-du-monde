import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { User } from '../models/user.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  usersSubject = new Subject<User[]>();

  constructor() { }

  emitUsers(){
  	this.usersSubject.next(this.users);
  }

  saveUsers(){
    firebase.database().ref('/users').set(this.users);
  }

  getUsers(){
    firebase.database().ref('/users')
      .on('value', (data: DataSnapshot) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      }
    );
  }
}
