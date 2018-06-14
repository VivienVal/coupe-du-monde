import { Injectable } from '@angular/core';
import { Pari } from '../models/pari.model';
import { Match } from '../models/match.model';
import { User } from '../models/user.model';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs/subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ParisService {

  userSubject = new Subject<User[]>();
  parisSubject = new Subject<Pari[]>();
  paris: Pari[] = [];
  users: User[] = [];
  pari: Pari;
  pariSubject = new Subject<Pari>();

  constructor() { }

  emitParis(){
  	this.parisSubject.next(this.paris);
  }

  emitPari(){
    this.pariSubject.next(this.pari);
  }

  saveParis(){
    for (let pari of this.paris){
      pari.match['intDate'] = pari.match.date.getTime();
    }
    firebase.database().ref('/paris').set(this.paris);
  }

  getParis(){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/paris')
          .on('value', (data: DataSnapshot) => {
            this.paris = data.val() ? data.val() : [];
            for (let pari of this.paris){
              pari.match['date'] = new Date(pari.match.intDate);
            }
            this.paris.sort(
              (a, b) => {
                return a.match.intDate - b.match.intDate;
              }
            );        
            this.emitParis();
            resolve('ok');
          }
        );
      }
    );
  }

  getSinglePari(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/paris/' + id).once('value').then(
          (data: DataSnapshot) => {
            const pari = data.val();
            pari.match['date'] = new Date(pari.match.intDate);
            resolve(pari);
          }, (error) => {
            reject(error);
          }
        );
      }
    );  
  }

  createNewPari(newPari: Pari){
    const id = this.checkPariAlreadyExist(newPari);
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
    return (matchA.equipeA.name === matchB.equipeA.name && 
        matchA.equipeB.name === matchB.equipeB.name &&
        matchA.intDate == matchB.intDate);
  }

  setScorePari(match: Match, scoreA: number, scoreB: number){
    for (let pari of this.paris){
      if (this.matchEquals(match, pari.match)){
        pari.match.scoreA = scoreA;
        pari.match.scoreB = scoreB;
        const pointsPari = this.isPariValid(pari,scoreA,scoreB);
        pari.scorePari = pointsPari;
        this.users[this.findUserFromPari(pari.user)].nbPoints += pointsPari;
      }
    }
    this.emitUsers();
    this.emitParis();
    this.saveUsers();
    this.saveParis();
  }

  isPariValid(pari: Pari, scoreA: number, scoreB: number){
    if (pari.scoreA == scoreA && pari.scoreB == scoreB){
      return 3;
    }
    else if (Math.sign(pari.scoreA - pari.scoreB) == Math.sign(scoreA - scoreB)){
      return 1;
    }
    return 0;
  }

  emitUsers(){
    this.userSubject.next(this.users);
  }

  saveUsers(){
    firebase.database().ref('/users').set(this.users);
  }

  getUsers(){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users')
          .on('value', (data: DataSnapshot) => {
            this.users = data.val() ? data.val() : [];
            this.users.sort(
              (a, b) => {
                return b.nbPoints - a.nbPoints;
              }
            )
            this.emitUsers();
            resolve('users ok');
          }
        );
      }
    );
  }

  findUserFromPari(userName: string){
    for (let i in this.users){
      if (this.users[i].userName == userName){
        return i;
      }
    }
    return -1;
  }

  findPari(match: Match, userName: string){
    if(this.paris.length == 0){
      this.getParis().then(
        (valid: string) => {          
          this.searchPari(match, userName);
        }
      );
    }
    else {
      this.searchPari(match, userName);
    }
  }

  searchPari(match: Match, userName: string){
    for (let pari of this.paris){
      if (this.matchEquals(match, pari.match) && userName == pari.user){
        this.pari = pari;
        this.emitPari();
        return pari;
      }
    }
    this.pari = null;
    this.emitPari();
    return null;
  }
}
