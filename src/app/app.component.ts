import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(){
		var config = {
		    apiKey: "AIzaSyArbcTmfifsGZBpA0nvalxQE49aZ1spToo",
		    authDomain: "coupe-du-monde-47bea.firebaseapp.com",
		    databaseURL: "https://coupe-du-monde-47bea.firebaseio.com",
		    projectId: "coupe-du-monde-47bea",
		    storageBucket: "",
		    messagingSenderId: "44202091389"
	    };
	    firebase.initializeApp(config);
	}
}
