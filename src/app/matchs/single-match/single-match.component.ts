import { Component, OnInit } from '@angular/core';
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
export class SingleMatchComponent implements OnInit {

  match: Match;
  pari: Pari;
  pariClicked: boolean;
  setScoreClicked: boolean;
  pariSubscription: Subscription;
  setScoreSubscription: Subscription;
  isScoreSet: boolean = false;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  isMatchDatePassed: boolean;

  constructor(	private matchsService: MatchsService,
  				private router: Router,
  				private route: ActivatedRoute,
          private parisService: ParisService,
          private authService: AuthService) { }

  ngOnInit() {
  	const id = this.route.snapshot.params['id'];
  	this.matchsService.getSingleMatch(+id).then(
  		(match: Match) => {
  			this.match = match;
        this.isScoreSet = (typeof(match.scoreA) != 'undefined');
        this.isMatchDatePassed = new Date() > match.date;
        this.pari = this.parisService.findPari(this.match, this.authService.userName);
  		}
  	);
  	this.pariSubscription = this.matchsService.pariClickedSubject.subscribe(
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
}
