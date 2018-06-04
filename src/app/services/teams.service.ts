import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Subject } from 'rxjs/subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams = [];
  teamsSubject = new Subject<Team[]>();

  constructor() { }

  emitTeams(){
  	this.teamsSubject.next(this.teams);
  }

  saveTeams(){
  	firebase.database().ref('/teams').set(this.teams);
  }

  getTeams(){
    firebase.database().ref('/teams')
      .on('value', (data: DataSnapshot) => {
        this.teams = data.val() ? data.val() : [];
        this.emitTeams();
      }
    );
  }

  createTeams(equipeA: Team, equipeB: Team){
  	if (this.checkTeamInexistence(equipeA)){
  		console.log('tres');
  		this.teams.push(equipeA);
  	}
  	if (this.checkTeamInexistence(equipeB)){
  		this.teams.push(equipeB);
  	}
  	this.emitTeams();
  	this.saveTeams();
  }

  checkTeamInexistence(equipe){
  	for (let team of this.teams){
  		if (equipe.name == team.name){
  			return false;
  		}
  	}
  	return true;
  }

  setTeamPoints(scoreA: number, scoreB: number, equipeA: Team, equipeB: Team){
  	for (let team of this.teams){
  		if (team.name == equipeA.name){
  			if (scoreA > scoreB){
  				team.points += 3;		
  			}
  			else if (scoreA == scoreB){
  				team.points += 1;
  			}
  		}
  		else if (team.name == equipeB.name){
  			if (scoreB > scoreA){
  				team.points += 3;			
  			}
  			else if (scoreA == scoreB){
  				team.points += 1;
  			}
  		}
  	}
  	this.emitTeams();
  	this.saveTeams();
  }
}
