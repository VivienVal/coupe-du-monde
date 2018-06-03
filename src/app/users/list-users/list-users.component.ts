import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs/subscription';
import { ParisService } from '../../services/paris.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  users: User[];
  userSubscription: Subscription;

  constructor(	private usersService: UsersService,
  				private parisService: ParisService) { }

  ngOnInit() {  	
	  this.userSubscription = this.parisService.userSubject.subscribe(
	  		(users: User[]) => {
	  			this.users = users;
	  		}
	  );
	  this.parisService.emitUsers();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
