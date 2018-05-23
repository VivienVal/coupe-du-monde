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
  pariClickedSubject = new Subject<boolean>();

  constructor() { }

  emitPariClicked(){
    this.pariClickedSubject.next(this.pariClicked);
  }

  emitMatchs(){
  	this.matchsSubject.next(this.matchs);
  }

  saveMatchs(){
    firebase.database().ref('/matchs').set(this.matchs);
  }

  getMatchs(){
    firebase.database().ref('/matchs')
      .on('value', (data: DataSnapshot) => {
        this.matchs = data.val() ? data.val() : [];
        this.emitMatchs();
      }
    );
  }

  getSingleMatch(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/matchs/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
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
}
