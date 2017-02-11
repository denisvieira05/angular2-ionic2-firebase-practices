import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';

const appRoutes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventComponent },
  { path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
