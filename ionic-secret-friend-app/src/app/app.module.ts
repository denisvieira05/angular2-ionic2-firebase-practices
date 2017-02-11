import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { EventListPage } from '../pages/event-list/event-list';
import { EventData } from '../providers/event-data';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EventListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    EventListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, EventData]
})
export class AppModule {}
