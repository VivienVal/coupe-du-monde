import { Component, OnInit } from '@angular/core';
import { Pari } from '../../models/pari.model';
import { ParisService } from '../../services/paris.service';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-list-paris',
  templateUrl: './list-paris.component.html',
  styleUrls: ['./list-paris.component.scss']
})
export class ListParisComponent implements OnInit {

  paris: Pari[];
  parisSubscription: Subscription;

  constructor(private parisService: ParisService) { }

  ngOnInit() {
  	this.parisSubscription = this.parisService.parisSubject.subscribe(
	  		(paris: Pari[]) => {
	  			this.paris = paris;
	  		}
	  );
	  this.parisService.emitParis();
  }

}
