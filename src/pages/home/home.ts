import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'home.html'
})
export class HomePage {
	private fruit;
	aboutPage = AboutPage;

  constructor(public navCtrl: NavController) {
    this.fruit = "kiwi";
  }

}
