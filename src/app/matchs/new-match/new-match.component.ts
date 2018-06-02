import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { Team } from '../../models/team.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchsService } from '../../services/matchs.service';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss']
})
export class NewMatchComponent implements OnInit {

  matchForm: FormGroup;

  constructor(	private router: Router,
  				private formBuilder: FormBuilder,
  				private route: ActivatedRoute,
  				private matchsService: MatchsService
			) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm(){
  	this.matchForm = this.formBuilder.group({
  		equipeA: ['', Validators.required],
  		equipeB: ['', Validators.required],
  		date: ['', Validators.required]
  	});
  }

  onSaveMatch() {
  	const equipeA = new Team(this.matchForm.get('equipeA').value);
  	const equipeB = new Team(this.matchForm.get('equipeB').value);
  	const date = this.matchForm.get('date').value;
    const newMatch = new Match(equipeA, equipeB, date);
    this.matchsService.createMatch(newMatch);
    this.router.navigate(['/matchs', 'list']);
  }
}
