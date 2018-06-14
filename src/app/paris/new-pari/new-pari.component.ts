import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pari } from '../../models/pari.model';
import { ParisService } from '../../services/paris.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchsService } from '../../services/matchs.service';
import { Subscription } from 'rxjs/subscription';
import { AuthService } from '../../services/auth.service';
import { Match } from '../../models/match.model';

@Component({
  selector: 'app-new-pari',
  templateUrl: './new-pari.component.html',
  styleUrls: ['./new-pari.component.scss']
})
export class NewPariComponent implements OnInit, OnDestroy {

  pariForm: FormGroup;
  pariSubscription: Subscription;
  pariClicked: boolean;
  match: Match;
  id: number;

  constructor(	private router: Router,
  				private parisService: ParisService,
  				private formBuilder: FormBuilder,
  				private route: ActivatedRoute,
  				private matchsService: MatchsService,
          private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.match = this.matchsService.matchs[this.id];
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
    const userName = this.authService.userName;
  	const scoreA = this.pariForm.get('scoreA').value;
  	const scoreB = this.pariForm.get('scoreB').value;
    const newPari = new Pari(this.match, scoreA, scoreB, userName);
    this.parisService.createNewPari(newPari);
    this.matchsService.changePariClicked();    
    this.parisService.findPari(this.match, this.authService.userName);
    //this.router.navigate(['/matchs', 'list']);

  }

  ngOnDestroy(){
    this.pariSubscription.unsubscribe();
  }
}
