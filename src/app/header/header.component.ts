import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/subscription';
import { MatchsService } from '../services/matchs.service';
import { ParisService } from '../services/paris.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  userName: string;
  authSubscription: Subscription;

  constructor(  private authService: AuthService,
                private matchsService: MatchsService,
                private parisService: ParisService) { }

  ngOnInit() {  
    this.matchsService.getMatchs(); 
    this.authService.checkAuth();
    this.authSubscription = this.authService.authSubject.subscribe(
      (userName: string) => {
        this.isAuth = userName !== '';
        this.userName = userName;
        if (userName){
          this.parisService.getParis(userName);        
        }
      }
    );
  }

  onSignOut(){
  	this.authService.signOutUser();
  }

  ngOnDestroy(){
    this.authService.signOutUser();
    this.authSubscription.unsubscribe();
  }
}
