import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { Team } from '../../models/team.model';
import { Poule } from '../../models/poule.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchsService } from '../../services/matchs.service';
import { TeamsService } from '../../services/teams.service';
import { PoulesService } from '../../services/poules.service';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {

  poules: Poule[];
  matchForm: FormGroup;
  pouleSubscription: Subscription;

  constructor(	private router: Router,
  				private formBuilder: FormBuilder,
  				private route: ActivatedRoute,
  				private matchsService: MatchsService,
          private teamsService: TeamsService,
          private poulesService: PoulesService
			) { }

  ngOnInit() {
    this.pouleSubscription = this.poulesService.poulesSubject.subscribe(
        (poules: Poule[]) => {
          this.poules = poules;
        }
    );
  	this.initForm();
  }

  initForm(){
  	this.matchForm = this.formBuilder.group({
  		equipeA: ['', Validators.required],
  		equipeB: ['', Validators.required],
  		date: ['', Validators.required],
      poule: ['', Validators.required]
  	});
  }

  onSaveMatch() {
  	const equipeA = new Team(this.matchForm.get('equipeA').value);
  	const equipeB = new Team(this.matchForm.get('equipeB').value);
    const poule = this.matchForm.get('poule').value;
  	const date = this.matchForm.get('date').value;
    const newMatch = new Match(equipeA, equipeB, date, poule);
    this.poulesService.createPoule(poule);
    this.matchsService.createMatch(newMatch);
    this.teamsService.createTeams(equipeA, equipeB);
    this.router.navigate(['/matchs', 'list']);
  }
}
