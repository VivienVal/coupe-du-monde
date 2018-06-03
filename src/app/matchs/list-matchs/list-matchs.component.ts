import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchsService } from '../../services/matchs.service';
import { Match } from '../../models/match.model';
import { Subscription } from 'rxjs/subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-matchs',
  templateUrl: './list-matchs.component.html',
  styleUrls: ['./list-matchs.component.scss']
})
export class ListMatchsComponent implements OnInit, OnDestroy {

  matchs: Match[];
  matchSubscription: Subscription;
  changeMatchSubscription: Subscription;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  passedMatchs = [];
  futurMatchs = [];
  changeMatch: boolean;

  constructor(  private matchsService: MatchsService,
                private router: Router) { }

  ngOnInit() {
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
	  		}
	  );
    this.changeMatchSubscription = this.matchsService.changeMatchSubject.subscribe(
      (changeMatch: boolean) => {
        this.changeMatch = changeMatch;
      }
    );
	  this.matchsService.emitMatchs();
  }

  onViewMatch(index: number){
    this.router.navigate(['/matchs', 'view', index]);
  }

  onChangeMatchs(){
    this.matchsService.changeDisplayMatch();
  }

  ngOnDestroy(){
    this.matchSubscription.unsubscribe();
  }
}
