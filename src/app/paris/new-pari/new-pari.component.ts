import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pari } from '../../models/pari.model';
import { ParisService } from '../../services/paris.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { MatchsService } from '../../services/matchs.service';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-new-pari',
  templateUrl: './new-pari.component.html',
  styleUrls: ['./new-pari.component.scss']
})
export class NewPariComponent implements OnInit {

  pariForm: FormGroup;
  pariSubscription: Subscription;
  pariClicked: boolean;

  constructor(	private router: Router,
  				private parisService: ParisService,
  				private formBuilder: FormBuilder,
  				private route: ActivatedRoute,
  				private matchsService: MatchsService) { }

  ngOnInit() {
  	this.initForm();
  	this.pariSubscription = this.matchsService.pariClickedSubject.subscribe(
  		(pariClicked: boolean) => {
  			this.pariClicked = pariClicked;
  		}
  	);
  	this.matchsService.emitPariClicked();
  }

  initForm(){
  	this.pariForm = this.formBuilder.group({
  		scoreA: [0, Validators.required],
  		scoreB: [0, Validators.required]
  	});
  }

  onSavePari() {
  	const scoreA = this.pariForm.get('scoreA').value;
  	const scoreB = this.pariForm.get('scoreB').value;
    const id = this.route.snapshot.params['id'];
    const userName = firebase.auth().currentUser.email;
    this.matchsService.changePariClicked();
  }
}
