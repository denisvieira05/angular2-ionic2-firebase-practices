import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventData {
	data: any;


  constructor(public http: Http) {
    console.log('Hello EventData Provider');
  }

  load(): Promise<any> {    
    if (this.data) {      
      return Promise.resolve(this.data);    
    }    

    return new Promise((resolve, reject) => {      
      this.http.get('assets/db/events.json')      
        .map(res => res.json())      
        .subscribe(        
          data => {          
            this.data = data;          
            resolve(this.data);        
          },        
        err => reject(err)      
        );    
    });  
  }
}
