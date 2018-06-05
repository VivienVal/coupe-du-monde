import { Injectable } from '@angular/core';
import { Poule } from '../models/poule.model';
import { Subject } from 'rxjs/subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PoulesService {

  poules = [new Poule('bonjour')];
  poulesSubject = new Subject<Poule[]>();

  constructor() { }

   emitPoules(){
  	this.poulesSubject.next(this.poules);
  }

  savePoules(){
    firebase.database().ref('/poules').set(this.poules);
  }

  getPoules(){
    firebase.database().ref('/poules')
      .on('value', (data: DataSnapshot) => {
        this.poules = data.val() ? data.val() : [];
        this.emitPoules();
      }
    );
  }

  createPoule(poule: Poule){
  	if (this.checkPouleInexistence(poule)){
  		this.poules.push(poule);
  	}
  	this.emitPoules();
  	this.savePoules();
  }

  checkPouleInexistence(poul){
  	for (let poule of this.poules){
  		if (poul.name == poule.name){
  			return false;
  		}
  	}
  	return true;
  }
}
