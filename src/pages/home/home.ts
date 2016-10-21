import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from "@angular/core";
import { Platform } from 'ionic-angular';
import { User } from '../../model/user';
import { Level } from '../level/level';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'home.html',
  providers: [
  	User
  ]
})
export class HomePage {
	private canv: any;
	private ctx: any;
	private platform: Platform;
	private user: User;
	private context: CanvasRenderingContext2D;
	private stepsHeightGap: number;
	private stepRadius: number;
	private navCtrl: NavController;

	@ViewChild("myCanvas") myCanvas;

	constructor(platform: Platform, user: User, navCtrl: NavController) {
		this.platform = platform;
		this.user = user;
		this.stepsHeightGap = 90;
		this.stepRadius = 30;
		this.navCtrl = navCtrl;
	}

	stepSelection(event:any, elem:any) {
		
		this.user.levelMap.forEach(function (pt, i) {
			var xDifference = event.offsetX - pt.x
			var xDistance = xDifference * xDifference;
			var yDifference = event.offsetY - pt.y
			var yDistance = yDifference * yDifference;

			if(xDistance + yDistance < elem.stepRadius * elem.stepRadius)
			{
				elem.navCtrl.push(Level, {
					value: (+i+1)
				});
			}
		})
	}

	ngAfterViewInit() {
		console.log(this.user);
		let canvas = this.myCanvas.nativeElement;
		canvas.width = this.platform.width();
		if(this.user.level*this.stepsHeightGap > this.platform.height()) {
			canvas.height = this.user.level*this.stepsHeightGap + 120;
		}
		else
		{
			canvas.height = this.platform.height() - 60;
		}

		this.user.levelMap.push( {x: 40, y: canvas.height - 60} );
		this.generateLvlMap();

		this.context = canvas.getContext("2d");

		this.drawPath();
		this.drawSteps();
		
		this.context.stroke();
	}

	private generateLvlMap() : void {
		for (var i = 1; i < this.user.level; ++i) {
			this.user.levelMap.push( {x: (Math.random()+Math.random())/2*this.platform.width(), y: this.user.levelMap[this.user.levelMap.length-1].y-this.stepsHeightGap} );
		}
	}

	private drawPath() : void {
		this.context.beginPath();
		var firstLevel = this.user.levelMap[0];
		this.context.moveTo(firstLevel.x, firstLevel.y)
		for (var i in this.user.levelMap) {
			this.context.lineTo(this.user.levelMap[i].x, this.user.levelMap[i].y);
		}
		this.context.stroke();
	}

	private drawSteps() : void {
		for (var i in this.user.levelMap) {
			this.context.beginPath();
			this.context.arc(this.user.levelMap[i].x, this.user.levelMap[i].y, this.stepRadius, 0, 2*Math.PI);
			this.context.fillStyle = 'white';
			this.context.fill();
			this.context.moveTo(this.user.levelMap[i].x, this.user.levelMap[i].y);
			this.context.fillStyle = 'black';
			this.context.textAlign = 'center';
			this.context.textBaseline = 'middle';
			this.context.fillText((+i+1).toString(), this.user.levelMap[i].x, this.user.levelMap[i].y);
			this.context.stroke();
		}
	}
}
