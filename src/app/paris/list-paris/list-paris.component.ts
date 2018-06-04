import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pari } from '../../models/pari.model';
import { Match } from '../../models/match.model';
import { ParisService } from '../../services/paris.service';
import { Subscription } from 'rxjs/subscription';
import { AuthService } from '../../services/auth.service';
import { MatchsService } from '../../services/matchs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-paris',
  templateUrl: './list-paris.component.html',
  styleUrls: ['./list-paris.component.scss']
})
export class ListParisComponent implements OnInit, OnDestroy {

  paris: Pari[];
  matchs: Match[];
  parisSubscription: Subscription;
  matchsSubscription: Subscription;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  constructor(  private parisService: ParisService,
                private authService: AuthService,
                private matchsService: MatchsService,
                private router: Router) { }

  ngOnInit() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  	this.parisSubscription = this.parisService.parisSubject.subscribe(
	  		(paris: Pari[]) => {
	  			this.paris = paris;
	  		}
	  );
    this.matchsSubscription = this.matchsService.matchsSubject.subscribe(
        (matchs: Match[]) => {
          this.matchs = matchs;
        }
    );
    this.matchsService.emitMatchs();
	  this.parisService.emitParis();
  }

  onViewPari(index: number){
    for (let i in this.matchs){
      if (this.matchsService.matchEquals(this.matchs[i], this.paris[index].match)){
        return this.router.navigate(['/matchs', 'view', i]);
      }
    }
  }

  ngOnDestroy(){
    this.parisSubscription.unsubscribe();
  }
}
