import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventData } from '../../providers/event-data';

/*
  Generated class for the EventList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})

export class EventListPage {

  events: {};

  constructor(
    public eventData: EventData
    ) {}

  ngOnInit() {
    this.eventData.load().then(response => {
      this.events = response;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }
  

}
