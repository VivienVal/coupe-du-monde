import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchsService } from '../../services/matchs.service';
import { Match } from '../../models/match.model';
import { Pari } from '../../models/pari.model';
import { Subscription } from 'rxjs/subscription';
import { Router } from '@angular/router';
import { ParisService } from '../../services/paris.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-matchs',
  templateUrl: './list-matchs.component.html',
  styleUrls: ['./list-matchs.component.scss']
})
export class ListMatchsComponent implements OnInit, OnDestroy {

  matchs: Match[];
  matchWithPari: number[] = [];
  matchSubscription: Subscription;
  changeMatchSubscription: Subscription;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  passedMatchs = [];
  futurMatchs = [];
  changeMatch: boolean;
  matchIndex: number;
  paris: Pari[];
  parisSubscription: Subscription;

  constructor(  private matchsService: MatchsService,
                private router: Router,
                private authService: AuthService,
                private parisService: ParisService) { }

  ngOnInit() {  
    if(this.parisService.paris.length == 0){
      this.parisService.getParis();
    }
	  this.matchSubscription = this.matchsService.matchsSubject.subscribe(
	  		(matchs: Match[]) => {
	  			this.matchs = matchs;      
          for (let match of this.matchs){
            if (match.intDate < new Date().getTime()){
              this.passedMatchs.push(match);
            }
            else {
              this.futurMatchs.push(match);
            }
          }          
          this.parisSubscription = this.parisService.parisSubject.subscribe(
            (paris: Pari[]) => {
              this.paris = paris;
              this.findMatchsWithParis();
            }
          );
	  		}
	  );
    this.changeMatchSubscription = this.matchsService.changeMatchSubject.subscribe(
      (changeMatch: boolean) => {
        this.changeMatch = changeMatch;
      }
    );
	  this.matchsService.emitMatchs();
    this.parisService.emitParis();
    this.matchsService.emitChangeMatch();
  }

  onViewMatch(index: number, whatTab: string){
    if (whatTab == 'p'){
      for (let i in this.matchs){
        if (this.matchsService.matchEquals(this.matchs[i], this.passedMatchs[index])){
          this.matchIndex = +i;
        }
      }
    }
    else{
      for (let i in this.matchs){
        if (this.matchsService.matchEquals(this.matchs[i], this.futurMatchs[index])){
          this.matchIndex = +i;
        }
      }
    }
    this.router.navigate(['/matchs', 'view', this.matchIndex]);
  }

  onChangeMatchs(){
    this.matchsService.changeDisplayMatch();
  }

  findMatchsWithParis(){
    this.matchWithPari.splice(0, this.matchWithPari.length);  
    for (let pari of this.paris){
      for (let i in this.futurMatchs){
        if (this.matchsService.matchEquals(this.futurMatchs[i], pari.match) && 
            this.authService.userName == pari.user){
            console.log(this.futurMatchs[i], pari, i);
          this.matchWithPari.push(+i);
        }
      }
    }
  }

  getColor(i: number){
    if (this.matchWithPari.indexOf(i) != -1){
      return 'lightgreen';
    }
    return '';
  }

  ngOnDestroy(){
    this.matchSubscription.unsubscribe();
    this.changeMatchSubscription.unsubscribe();
    this.parisSubscription.unsubscribe();
  }
}
