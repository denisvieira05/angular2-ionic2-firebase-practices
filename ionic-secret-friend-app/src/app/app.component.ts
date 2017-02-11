import { Component,ViewChild } from '@angular/core';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Events, Nav, Platform} from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { EventListPage} from '../pages/event-list/event-list'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;


  constructor(platform: Platform, public events: Events) {
    platform.ready().then(() => {
      this.rootPage = LoginPage;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.listenToLoginEvents
    });
  }

    listenToLoginEvents() {    
      this.events.subscribe('user:login', () => {     
       this.nav.setRoot(EventListPage);    });  
         this.events.subscribe('user:logout', () => 
           {      this.nav.setRoot(LoginPage);    });
       }
}
