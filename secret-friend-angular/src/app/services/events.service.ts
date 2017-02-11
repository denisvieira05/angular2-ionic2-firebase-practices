import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Event } from '../interfaces/event';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsService {
  private eventsUrl = 'http://jsonplaceholder.typicode.com/users';

  events = [
      {
      id: 1,
      name: "teste event",
      date: "12/05/17",
      street: 'R. Evento 1, s/n - Farol',
      city: 'Maceió',
      state: 'AL'
      },
      {
      id: 2,
      name: "teste event 2",
      date: "12/05/17",
      street: "R. Evento 2, s/n - Farol",
      city: 'Maceió',
      state: 'AL'
      },      
      {
      id: 3,
      name: "teste event 3",
      date: "12/05/17",
      street: 'R. Evento 3, s/n - Farol',
      city: 'Maceió',
      state: 'AL'
      }
  ];

  constructor(private http: Http) {
    console.log('EventsService foi inicializado');
  }

  getEvents() {
    return this.events;
  }

  getEvent(id){
    let event = this.events.filter(x => x.id == id)[0];
    return event;
  }
}
