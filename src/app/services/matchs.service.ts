import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs/subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class MatchsService {

  matchs: Match[] = [];
  pariClicked: boolean = false;
  setScoreClicked: boolean = false;
  changeMatch: boolean = false;

  matchsSubject = new Subject<Match[]>();
  pariClickedSubject = new Subject<boolean>();
  scoreClickedSubject = new Subject<boolean>();
  changeMatchSubject = new Subject<boolean>();

  constructor() { }

  emitPariClicked(){
    this.pariClickedSubject.next(this.pariClicked);
  }

  emitscoreClicked(){
    this.scoreClickedSubject.next(this.setScoreClicked);
  }

  emitChangeMatch(){
    this.changeMatchSubject.next(this.changeMatch);
  }

  emitMatchs(){
  	this.matchsSubject.next(this.matchs);
  }

  saveMatchs(){
    for (let match of this.matchs){
      match['intDate'] = match.date.getTime();
    }
    firebase.database().ref('/matchs').set(this.matchs);
  }

  getMatchs(){
    firebase.database().ref('/matchs')
      .on('value', (data: DataSnapshot) => {
        this.matchs = data.val() ? data.val() : [];
        for (let match of this.matchs){
          match['date'] = new Date(match.intDate);
        }
        this.matchs.sort(
          (a, b) => {
            return a.intDate - b.intDate;
          }
        );
        this.emitMatchs();
      }
    );
  }

  getSingleMatch(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/matchs/' + id).once('value').then(
          (data: DataSnapshot) => {
            const match = data.val();
            match['date'] = new Date(match.intDate);
            resolve(match);
          }, (error) => {
            reject(error);
          }
        );
      }
    );  
  }

  changePariClicked(){
    this.pariClicked = !this.pariClicked;
    this.emitPariClicked();
  }

  changeScoreClicked(){
    this.setScoreClicked = !this.setScoreClicked;
    this.emitscoreClicked();
  }

  changeDisplayMatch(){
    this.changeMatch = !this.changeMatch;
    this.emitChangeMatch();
  }

  setMatchScore(id, scoreA, scoreB){
    this.matchs[id].scoreA = scoreA;
    this.matchs[id].scoreB = scoreB;
    this.emitMatchs();
    this.saveMatchs();
  }

  createMatch(newMatch: Match){
    this.matchs.push(newMatch);
    this.emitMatchs();
    this.saveMatchs();
  }

  matchEquals(matchA: Match, matchB: Match){
    return (matchA.equipeA.name === matchB.equipeA.name && 
        matchA.equipeB.name === matchB.equipeB.name &&
        matchA.intDate == matchB.intDate);
  }
}
