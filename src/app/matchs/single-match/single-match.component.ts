import { Component, OnInit, OnDestroy } from '@angular/core';
import { Match } from '../../models/match.model';
import { Pari } from '../../models/pari.model';
import { MatchsService} from '../../services/matchs.service';
import { ParisService } from '../../services/paris.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})
export class SingleMatchComponent implements OnInit, OnDestroy {

  match: Match;
  pari: Pari;
  parisForOneMatch: Pari[] = [];
  pariClicked: boolean;
  setScoreClicked: boolean;
  pariClickedSubscription: Subscription;
  pariSubscription: Subscription;
  setScoreSubscription: Subscription;
  isScoreSet: boolean = false;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  isMatchDatePassed: boolean;
  parisForOneMatchSubscription: Subscription;

  constructor(	private matchsService: MatchsService,
  				private router: Router,
  				private route: ActivatedRoute,
          private parisService: ParisService,
          private authService: AuthService) { }

  ngOnInit() {
  	const id = this.route.snapshot.params['id'];
    this.parisService.getParis().then(
      (val: string) => {
        console.log(val);
      }
    );
    this.pariSubscription = this.parisService.pariSubject.subscribe(
      (pari: Pari) => {
        this.pari = pari;
      }
    );
    this.parisForOneMatchSubscription = this.parisService.parisForOneMatchSubject.subscribe(
      (parisForOneMatch: Pari[]) => {
        this.parisForOneMatch = parisForOneMatch;
      }
    )
  	this.matchsService.getSingleMatch(+id).then(
  		(match: Match) => {
  			this.match = match;
        this.isScoreSet = (typeof(match.scoreA) != 'undefined');
        this.isMatchDatePassed = new Date() > match.date;
        this.parisService.findParisForOneMatch(this.match);
        this.parisService.findPari(this.match, this.authService.userName);
  		}
  	);
  	this.pariClickedSubscription = this.matchsService.pariClickedSubject.subscribe(
  		(pariClicked: boolean) => {
  			this.pariClicked = pariClicked;
  		}
  	);
    this.setScoreSubscription = this.matchsService.scoreClickedSubject.subscribe(
      (scoreClicked: boolean) => {
        this.setScoreClicked = scoreClicked;
      }
    );
  	this.matchsService.emitPariClicked();
    this.matchsService.emitscoreClicked();
    this.parisService.emitPari();
  }

  onBack() {
  	this.router.navigate(['/matchs']);
  }

  onPari() {
  	this.matchsService.changePariClicked();
  }

  onClickSetScore() {
    this.matchsService.changeScoreClicked();
  }

  ngOnDestroy(){
    this.pariClickedSubscription.unsubscribe();
    this.setScoreSubscription.unsubscribe();
    this.pariSubscription.unsubscribe();
    this.parisForOneMatchSubscription.unsubscribe();
  }
}
