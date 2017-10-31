import {Inject, Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export default class AffairsHttpService {
  constructor(private http: Http,
              @Inject('API_ENDPOINT') private apiEndpoint: string) {

  }

  createAffair(affair: any): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/affairs`, affair)
      .map(affairJson => affairJson.json());
  }

  removeAffair(ticket: string): Observable<any> {
    console.log(`${this.apiEndpoint}/affairs/${ticket}`);
    return this.http.delete(`${this.apiEndpoint}/affairs/${ticket}`)
      .map(removedAffair => removedAffair.json());
  }

  getAffair(ticket: string): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/affairs/${ticket}`)
      .map(affairJson => affairJson.json());
  }

  getAffairs(): Observable<any[]> {
    return this.http.get(`${this.apiEndpoint}/affairs/`)
      .map(affairsJson => affairsJson.json());
  }
}
