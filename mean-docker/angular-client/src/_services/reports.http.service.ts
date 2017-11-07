import {Inject, Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export default class ReportsHttpService {
  constructor(private http: Http,
              @Inject('API_ENDPOINT') private apiEndpoint: string) {

  }

  createReport(report: any): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/reports`, report)
      .map(reportJson => reportJson.json());
  }

  removeReport(id: string): Observable<any> {
    console.log(`${this.apiEndpoint}/reports/${id}`);
    return this.http.delete(`${this.apiEndpoint}/reports/${id}`)
      .map(removedReport => removedReport.json());
  }

  getReport(id: string): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/reports/${id}`)
      .map(reportJson => reportJson.json());
  }

  getReports(): Observable<any[]> {
    return this.http.get(`${this.apiEndpoint}/reports/`)
      .map(reportsJson => reportsJson.json());
  }
}
