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

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MatchsService } from './services/matchs.service';
import { ParisService } from './services/paris.service';
import { PoulesService } from './services/poules.service';
import { TeamsService } from './services/teams.service';


const appRoutes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'matchs/list', component: ListMatchsComponent },
  { path: 'matchs/view/:id', canActivate:[AuthGuardService], component: SingleMatchComponent },
  { path: 'paris/list', canActivate:[AuthGuardService], component: ListParisComponent },
  { path: 'paris/new', canActivate:[AuthGuardService], component: NewPariComponent },
  { path: 'poule/:id', component: SinglePouleComponent },
  { path: 'team/:id', component: SingleTeamComponent },
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
    SingleTeamComponent
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
    TeamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
