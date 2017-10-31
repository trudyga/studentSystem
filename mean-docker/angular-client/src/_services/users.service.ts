import {Inject, Injectable} from "@angular/core";
import {Http} from "@angular/http";

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export default class UsersService {
  constructor(@Inject(Http) private http: Http, @Inject('API_ENDPOINT') private apiEndpoint: string) {

  }

  createUser(user: any) {
    console.log(this.apiEndpoint);
    return this.http.post(`${this.apiEndpoint}/users`, user)
      .map(createdUserJson => createdUserJson.json());
  }

  getUser(login: any) {
    return this.http.get(`${this.apiEndpoint}/users/${login}`)
      .map(userJson => userJson.json());
  }

  getUsers() {
    return this.http.get(`${this.apiEndpoint}/users`)
      .map(usersJson => usersJson.json());
  }
}
