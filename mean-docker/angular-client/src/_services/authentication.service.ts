import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {Inject, Injectable} from "@angular/core";
import UsersService from "./users.service";

import 'rxjs/add/operator/map';
import {Router} from "@angular/router";

@Injectable()
export default class AuthenticationService {
  redirectUrl: string;

  constructor(@Inject(Http) private http: Http,
              @Inject('API_ENDPOINT') private apiEndpoint: string,
              @Inject(Router) private router: Router) {

  }

  public login(username: String, password: String): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/session`, {
      login: username,
      password: password
    }).map(token => {
      console.log(token);
      return token;
    }).map(token => {
      localStorage.setItem('currentUser',JSON.stringify({
        login: username,
        token: token.json().token
      }));

      this.redirect();

      return this.getCurrentUser();
    });
  }

  public isLoginedIn(): boolean {
    return !!this.getCurrentUser();
  }

  public getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public logout() {
    if (this.getCurrentUser())
      localStorage.removeItem('currentUser');
  }

  private redirect() {
    this.router.navigateByUrl(this.redirectUrl || '/home');
  }
}
