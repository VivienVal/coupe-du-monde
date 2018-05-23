import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match.model';
import { Pari } from '../../models/pari.model';
import { MatchsService} from '../../services/matchs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})
export class SingleMatchComponent implements OnInit {

  match: Match;
  pari: Pari;
  onPariClicked: boolean

  constructor(	private matchsService: MatchsService,
  				private router: Router,
  				private route: ActivatedRoute) { }

  ngOnInit() {
  	const id = this.route.snapshot.params['id'];
  	this.matchsService.getSingleMatch(+id).then(
  		(match: Match) => {
  			this.match = match;
  		}
  	);
  	this.onPariClicked = false;
  }

  onBack() {
  	this.router.navigate(['/matchs']);
  }

  onPari() {
  	this.onPariClicked = true;
  }
}
