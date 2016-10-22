import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from "@angular/core";
import { Platform } from 'ionic-angular';
import { User } from '../../model/user';
import { Level } from '../level/level';

import * as d3 from 'd3';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';


/*
  Generated class for the Home page.

  This component displays a map showing the level progression of the user
*/
@Component({
  templateUrl: 'home.html',
  providers: [
  	User
  ]
})
export class HomePage {
	private platform: Platform;
	private user: User;
	private stepsHeightGap: number;
	private navCtrl: NavController;
	private svgContainer: any;

	constructor(platform: Platform, user: User, navCtrl: NavController) {
		this.platform = platform;
		this.user = user;
		this.stepsHeightGap = 90;
		this.navCtrl = navCtrl;
	}

	/*
	* Set the 
	*/
	ngAfterViewInit() {
		// Container's height should be greater than the sum of all steps height, unless there are not enough to fill the platform's height
		var maxHeight = (this.user.level*this.stepsHeightGap > this.platform.height()) ? this.user.level*this.stepsHeightGap + 120 : this.platform.height() - 60;

		this.svgContainer = d3Selection.select('#visualization')
																		.attr('width', this.platform.width())
																		.attr('height', maxHeight);

		// The first step is always at the same spot, and is a reference for all the next ones
		this.user.levelMap.push( {x: 40, y: maxHeight - 60} );
		this.generateLvlMap();

		this.drawPath();
		this.drawSteps();
	}

	/*
	*	Generate the coordinates of each level point and store them in the user's levelMap attribute. This is done randomly for now but should follow a constant pattern, or use settled values
	*/
	private generateLvlMap() : void {
		for (var i = 1; i < this.user.level; ++i) {
			this.user.levelMap.push( {x: (Math.random()+Math.random())/2*this.platform.width(), y: this.user.levelMap[this.user.levelMap.length-1].y-this.stepsHeightGap} );
		}
	}

	/*
	* Draw the path of the level map, following the data created by generateLvlMap function
	*/
	private drawPath() : void {
		var lineFunction = d3Shape.line()
							.x(function(d, i) { return d.x })
							.y(function(d, i) { return d.y })
							.curve(d3Shape.curveCardinal);

		var lineGraph = this.svgContainer.append('path')
																.attr('d', lineFunction(this.user.levelMap))
																.attr('stroke', 'black')
																.attr('stroke-width', 2)
																.attr('fill', 'none');
	}

	/*
	* Draw the steps representing each of the user's level
	*/
	private drawSteps() : void {
		var steps = this.svgContainer.selectAll('g')
														.data(this.user.levelMap)
														.enter()
														.append('g')
											      .on('click', this.stepSelection);

		var circles = steps.append("circle")
									      .attr("r", 25)
									      .attr("cx", function(dd){return dd.x})
									      .attr("cy", function(dd){return dd.y})
									      .attr("fill", "white")
									      .attr("stroke", "black");

		var labels = steps.append('text')
											.attr('x', function(d) { return d.x })
											.attr('y', function(d) { return d.y })
											.attr("text-anchor", 'middle')
											.attr("dy", function(d){ return 5 })
											.text(function (d, i) {
												return +i+1;
											})
	}

	/*
	* Called when the user press a step
	*/
	private stepSelection = (data:any, index:any, elem:any) => {
		this.navCtrl.push(Level, {
			value: index+1
		})
	}

}
