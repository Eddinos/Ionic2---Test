import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Level page.

  This component displays the value of the selected level, and a return button
*/
@Component({
	selector: 'page-level',
	templateUrl: 'level.html'
})
export class Level {
	public value: number;
	private navCtrl: NavController;

  constructor(public navParams: NavParams, navCtrl: NavController) {
  	this.value = navParams.get('value');
  	this.navCtrl = navCtrl;
  }

  /*
  * Pop this page and go back to the previous one
  */
  public goBack(): void {
  	this.navCtrl.pop();
  }
}
