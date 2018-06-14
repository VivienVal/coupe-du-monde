import { Component, OnInit, OnDestroy } from '@angular/core';
import { Poule } from '../../models/poule.model';
import { Team } from '../../models/team.model';
import { PoulesService } from '../../services/poules.service';
import { Subscription } from 'rxjs/subscription';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-list-poules',
  templateUrl: './list-poules.component.html',
  styleUrls: ['./list-poules.component.scss']
})
export class ListPoulesComponent implements OnInit, OnDestroy {

  poules: Poule[];
  poulesSubscription: Subscription;
  teams: Team[];
  teamsSubscription: Subscription;

  constructor(	private poulesService: PoulesService,
  				private teamsService: TeamsService) { }

  ngOnInit() {
    if(this.poulesService.poules.length == 0){
      this.poulesService.getPoules();
    }
    if(this.teamsService.teams.length == 0){
      this.teamsService.getTeams();
    }
  	this.poulesSubscription = this.poulesService.poulesSubject.subscribe(
	  		(poules: Poule[]) => {
	  			this.poules = poules;
	  		}
	  );
	this.teamsSubscription = this.teamsService.teamsSubject.subscribe(
	  		(teams: Team[]) => {
	  			this.teams = teams;
	  		}
	  );
    this.poulesService.emitPoules();
    this.teamsService.emitTeams();
  }

  ngOnDestroy(){
  	this.poulesSubscription.unsubscribe();
    this.teamsSubscription.unsubscribe();
  }

}
