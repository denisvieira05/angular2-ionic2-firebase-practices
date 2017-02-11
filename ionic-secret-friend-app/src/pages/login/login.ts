import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { EventListPage } from '../event-list/event-list'
import { AuthService} from '../../providers/auth-service'


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
	isLoading: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _auth: AuthService,
    private events: Events) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  connectWithFacebook(): void {
  	this.isLoading = true;
  	this.navCtrl.push(EventListPage);
    this._auth.signInWithFacebook()
      .then(() => this.onSignSuccess())
      .catch(() => {
        this.isLoading =false;
      });

  }

  onSignSuccess(): void{
    this.events.publish('user:login');
  }

}
