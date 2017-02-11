import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { EventsService } from '../services/events.service';
import { Event } from '../interfaces/event';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [ UsersService, EventsService]
})
export class EventComponent implements OnInit {
  title: string;
  picture: string;
  eventDate: string;
  location: Location;
  friends: User[];
  showParticipants: boolean;
  event: Event;


  constructor(
    private usersService: UsersService,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Amigo Secreto Caravana Web';
    this.picture = 'https://images.pexels.com/photos/190931/pexels-photo-190931.jpeg?w=940&h=650&auto=compress&cs=tinysrgb';
    this.eventDate = '11/02/2017';
    this.location = {
      street: 'R. Cônego Machado, s/n - Farol',
      city: 'Maceió',
      state: 'AL'
    }
    this.showParticipants = false;

   this.activatedRoute.params.subscribe((params: Params) => {
      let eventId = params['id'];
      this.event = this.eventsService.getEvent(eventId);
      console.log('event :'+this.event);
    });;

    this.usersService.getUsers().subscribe(users => {
      this.friends = users;
    });
  }

  ngOnInit() {
  }

  addParticipant(user) {
    if (!user) { return; }

    this.usersService.addUser(user)
                     .subscribe(user => this.friends.push(user));
  }

  removeUser(index, friend) {
    console.log(`${this.friends.find(x => x === friend )} foi removido com sucesso`);
    this.friends.splice(index, 1);
  }

  toggleParticipants() {
    if (this.showParticipants) {
      this.showParticipants = false;
    } else {
      this.showParticipants = true;
    }
  }

}

interface Location {
  street: string;
  city: string;
  state: string;
  zip?: string;
}
