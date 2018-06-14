import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pari } from '../../models/pari.model';
import { ParisService } from '../../services/paris.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchsService } from '../../services/matchs.service';
import { Subscription } from 'rxjs/subscription';
import { AuthService } from '../../services/auth.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-set-match-score',
  templateUrl: './set-match-score.component.html',
  styleUrls: ['./set-match-score.component.scss']
})
export class SetMatchScoreComponent implements OnInit, OnDestroy {

  setScoreForm: FormGroup;
  scoreClickedSubscription: Subscription;
  scoreClicked: boolean;

  constructor(	private router: Router,
  				private parisService: ParisService,
  				private formBuilder: FormBuilder,
  				private route: ActivatedRoute,
  				private matchsService: MatchsService,
          private authService: AuthService,
          private teamsService: TeamsService) { }

  ngOnInit() {
  	this.initForm();
  	this.scoreClickedSubscription = this.matchsService.scoreClickedSubject.subscribe(
  		(scoreClicked: boolean) => {
  			this.scoreClicked = scoreClicked;
  		}
  	);
  	this.matchsService.emitscoreClicked();
  }

  initForm(){
  	this.setScoreForm = this.formBuilder.group({
  		scoreA: [0, Validators.required],
  		scoreB: [0, Validators.required]
  	});
  }

  onSaveMatchScore() {
  	const scoreA = this.setScoreForm.get('scoreA').value;
  	const scoreB = this.setScoreForm.get('scoreB').value;
    const id = this.route.snapshot.params['id'];
    const match = this.matchsService.matchs[id];
    this.matchsService.setMatchScore(id, scoreA, scoreB);
    this.parisService.setScorePari(match, scoreA, scoreB);
    this.teamsService.setTeamPoints(scoreA, scoreB, match.equipeA, match.equipeB);
    this.matchsService.changeScoreClicked();
  }

  ngOnDestroy(){
    this.scoreClickedSubscription.unsubscribe();
  }
}
