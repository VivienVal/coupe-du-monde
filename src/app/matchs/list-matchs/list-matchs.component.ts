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

  constructor(  private matchsService:MatchsService,
                private router: Router) { }

  ngOnInit() {
	  this.matchSubscription = this.matchsService.matchsSubject.subscribe(
	  		(matchs: Match[]) => {
	  			this.matchs = matchs;
	  		}
	  );
	  this.matchsService.emitMatchs();
  }

  /*onclick(){
  console.log(this.matchs);
	  this.matchs.sort(function(a, b) {
	  	return a.date - b.date;
	  });  	
	  console.log(this.matchs);
  }*/

  onViewMatch(index: number){
    this.router.navigate(['/matchs', 'view', index]);
  }

  ngOnDestroy(){
    this.matchSubscription.unsubscribe();
  }
}
