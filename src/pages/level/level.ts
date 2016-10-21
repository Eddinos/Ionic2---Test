import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Level page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-level',
	templateUrl: 'level.html'
})
export class Level {
	public value: number;

  constructor(public navParams: NavParams) {
  	this.value = navParams.get('value');
  }
}
