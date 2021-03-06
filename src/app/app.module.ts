import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListMatchsComponent } from './matchs/list-matchs/list-matchs.component';
import { SingleMatchComponent } from './matchs/single-match/single-match.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ListParisComponent } from './paris/list-paris/list-paris.component';
import { NewPariComponent } from './paris/new-pari/new-pari.component';
import { SinglePouleComponent } from './poules/single-poule/single-poule.component';
import { SingleTeamComponent } from './teams/single-team/single-team.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { SetMatchScoreComponent } from './matchs/set-match-score/set-match-score.component';
import { NewMatchComponent } from './matchs/new-match/new-match.component';
import { ListPoulesComponent } from './poules/list-poules/list-poules.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MatchsService } from './services/matchs.service';
import { ParisService } from './services/paris.service';
import { PoulesService } from './services/poules.service';
import { TeamsService } from './services/teams.service';
import { UsersService } from './services/users.service';


const appRoutes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'matchs/list', component: ListMatchsComponent },
  { path: 'matchs/new', canActivate:[AuthGuardService], component: NewMatchComponent },
  { path: 'matchs/view/:id', canActivate:[AuthGuardService], component: SingleMatchComponent },
  { path: 'paris/list', canActivate:[AuthGuardService], component: ListParisComponent },
  { path: 'paris/new', canActivate:[AuthGuardService], component: NewPariComponent },
  { path: 'poule/:id', component: SinglePouleComponent },
  { path: 'team/:id', component: SingleTeamComponent },  
  { path: 'users/list', component: ListUsersComponent },
  { path: 'poules/list', component: ListPoulesComponent },
  { path: '', redirectTo: 'matchs/list', pathMatch: 'full' },
  { path: '**', redirectTo: 'matchs/list' }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListMatchsComponent,
    SingleMatchComponent,
    SignupComponent,
    SigninComponent,
    ListParisComponent,
    NewPariComponent,
    SinglePouleComponent,
    SingleTeamComponent,
    ListUsersComponent,
    SetMatchScoreComponent,
    NewMatchComponent,
    ListPoulesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuardService,
    AuthService,
    MatchsService,
    ParisService,
    PoulesService,
    TeamsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
