import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { Pari } from '../../models/pari.model';
import { MatchsService} from '../../services/matchs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

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

  constructor(	private matchsService: MatchsService,
  				private router: Router,
  				private route: ActivatedRoute) { }

  ngOnInit() {
  	const id = this.route.snapshot.params['id'];
  	this.matchsService.getSingleMatch(+id).then(
  		(match: Match) => {
  			this.match = match;
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
