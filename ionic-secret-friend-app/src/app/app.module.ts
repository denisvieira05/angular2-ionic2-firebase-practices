import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { EventListPage } from '../pages/event-list/event-list';
import { EventData } from '../providers/event-data';
import { AuthService } from '../providers/auth-service';
import { AngularFireModule } from 'angularfire2'

export const firebaseConfig = {
  apiKey: "AIzaSyB887wiXUThC6ZF6tfljPpOFNsJ8ly7DeY",
  authDomain: "secret-friend-app.firebaseapp.com",
  databaseURL: "https://secret-friend-app.firebaseio.com",
  storageBucket: "secret-friend-app.appspot.com",
  messagingSenderId: "226993995023"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EventListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    EventListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, EventData,AuthService]
})
export class AppModule {}
