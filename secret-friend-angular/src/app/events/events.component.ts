import { Component, OnInit } from '@angular/core';
import { Event } from '../interfaces/event';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [ EventsService ]
})
export class EventsComponent implements OnInit {

  events: Event[];

  constructor(
  	 private eventsService: EventsService
  	) { 
    this.events = this.eventsService.getEvents();
  }

  ngOnInit() {
  }

}