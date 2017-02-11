import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private usersUrl = 'http://jsonplaceholder.typicode.com/users';

  constructor(private http: Http) {
    console.log('UsersService foi inicializado');
  }

  addUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.usersUrl, { 'name': user }, options)
                    .map(res => res.json());
  }

  getUsers() {
    return this.http.get(this.usersUrl)
                    .map(res => res.json());
  }
}
