import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/subscription';
import { MatchsService } from '../services/matchs.service';
import { ParisService } from '../services/paris.service'; 
import { TeamsService } from '../services/teams.service';
import { PoulesService } from '../services/poules.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  isAdmin: boolean;
  userName: string;
  authSubscription: Subscription;
  userTypeSubscription: Subscription;

  constructor(  private authService: AuthService,
                private matchsService: MatchsService,
                private parisService: ParisService,
                private teamsService: TeamsService,
                private poulesService: PoulesService) { }

  ngOnInit() {
    this.matchsService.getMatchs(); 
    this.parisService.getParis();
    this.parisService.getUsers();  
    this.teamsService.getTeams();
    this.poulesService.getPoules();
    this.authService.checkAuth();
    this.authSubscription = this.authService.authSubject.subscribe(
      (userName: string) => {
        this.isAuth = userName !== '';
        this.userName = userName;
      }
    );
    this.userTypeSubscription = this.authService.userTypeSubject.subscribe(
      (userType: string) => {
        this.isAdmin = userType == 'admin';
      }
    );
  }

  onSignOut(){
  	this.authService.signOutUser();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }
}
