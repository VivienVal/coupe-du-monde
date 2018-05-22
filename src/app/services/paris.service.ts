import { Injectable } from '@angular/core';
import { Pari } from '../models/pari.model';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs/subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ParisService {

  parisSubject = new Subject<Pari[]>();
  paris = [];

  constructor() { }

  emitParis(){
  	this.parisSubject.next(this.paris);
  }

  saveParis(){
    firebase.database().ref('/paris').set(this.paris);
  }

  getParis(){
    firebase.database().ref('/paris')
      .on('value', (data: DataSnapshot) => {
        this.paris = data.val() ? data.val() : [];
        this.emitParis();
      }
    );
  }

  getSinglePari(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/paris/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );  
  }
}
