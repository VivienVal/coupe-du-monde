import { Injectable } from '@angular/core';
import { Pari } from '../models/pari.model';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs/subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParisService {

  parisSubject = new Subject<Pari[]>();
  paris = [];

  constructor(private authService: AuthService) { }

  emitParis(){
  	this.parisSubject.next(this.paris);
  }

  saveParis(){
    firebase.database().ref('/paris').set(this.paris);
  }

  getParis(){
  /*
    firebase.database().ref('/paris')
      .orderByChild("user")
      .equalTo(userName)
      .on('value', (data: DataSnapshot) => {
        this.paris = data.val() ? data.val() : [];
        this.emitParis();
      }
    );
  */
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

  createNewPari(newPari: Pari){
    const id = this.checkPariAlreadyExist(newPari)
    if (id){
      this.paris.splice(+id,1,newPari);
    }
    else{
      this.paris.push(newPari);
    }
    this.emitParis();
    this.saveParis();
  }

  checkPariAlreadyExist(newPari: Pari){
    for (let i in this.paris){
      if (this.matchEquals(this.paris[i].match,newPari.match) && this.paris[i].user == newPari.user){
        return i;
      }
    }
    return false;
  }

  matchEquals(matchA: Match, matchB: Match){
    if (matchA.equipeA.name === matchB.equipeA.name && 
        matchA.equipeB.name === matchB.equipeB.name &&
        matchA.date === matchB.date){
          return true;
        }
    return false;
  }

  setScorePari(match: Match, scoreA: number, scoreB: number){
    
  }
}
