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

  /**
   * Authenticate the user on this device
   * @param {String} username
   * @param {String} password
   * @returns {Observable<any>}
   */
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

  /**
   * Check if user is logined in
   * @returns {boolean}
   */
  public isLoginedIn(): boolean {
    return !!this.getCurrentUser();
  }

  /**
   * Get current user object, that is stored in local storage
   * @returns {any}
   */
  public getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
   * Logout current user
   */
  public logout() {
    if (this.getCurrentUser())
      localStorage.removeItem('currentUser');
  }

  /**
   * Redirect user to the page, where he tried to log in
   */
  private redirect() {
    this.router.navigateByUrl(this.redirectUrl || '/home');
  }
}
