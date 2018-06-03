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

  matchsSubject = new Subject<Match[]>();
  matchs = [];
  pariClicked: boolean = false;
  setScoreClicked: boolean = false;
  pariClickedSubject = new Subject<boolean>();
  scoreClickedSubject = new Subject<boolean>();

  constructor() { }

  emitPariClicked(){
    this.pariClickedSubject.next(this.pariClicked);
  }

  emitscoreClicked(){
    this.scoreClickedSubject.next(this.setScoreClicked);
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
}
