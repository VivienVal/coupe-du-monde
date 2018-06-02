import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pari } from '../../models/pari.model';
import { ParisService } from '../../services/paris.service';
import { Subscription } from 'rxjs/subscription';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-paris',
  templateUrl: './list-paris.component.html',
  styleUrls: ['./list-paris.component.scss']
})
export class ListParisComponent implements OnInit, OnDestroy {

  paris: Pari[];
  parisSubscription: Subscription;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  constructor(  private parisService: ParisService,
                private authService: AuthService) { }

  ngOnInit() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  	this.parisSubscription = this.parisService.parisSubject.subscribe(
	  		(paris: Pari[]) => {
	  			this.paris = paris;
	  		}
	  );
	  this.parisService.emitParis();
  }

  ngOnDestroy(){
    this.parisSubscription.unsubscribe();
  }
}
