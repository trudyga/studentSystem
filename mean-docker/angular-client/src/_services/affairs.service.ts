import {Inject, Injectable} from "@angular/core";
import AffairsHttpService from "./affairs.http.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export default class AffairsService {
  public affairs$: Subject<any[]>;
  public selectedAffairs$: BehaviorSubject<any[]>;
  private selectedAffairs: any[] = [];

  constructor(@Inject(AffairsHttpService) private affairsHttpService: AffairsHttpService) {
    this.affairs$ = new Subject();
    this.selectedAffairs$ = new BehaviorSubject<any[]>([]);
  }

  /**
   * Get all affairs that were registered in the system
   * @returns {Observable<any[]>}
   */
  getAffairs(): Observable<any[]> {
    return this.affairsHttpService.getAffairs();
  }

  /**
   * Add an affair to the list of selected affairs
   * @param {Object} affair - an affair object to add to selected
   * @returns {Subscription}
   */
  addToSelected(affair: any): void {
    if (!this.selectedAffairs.some(a => a.ticket === affair.ticket))
      this.selectedAffairs.push(affair);
    this.selectedAffairs$.next(this.selectedAffairs);
  }

  /**
   * Remove an affair from the list of selected affairs
   * @param {string} affairTicket - ticket number
   */
  removeFromSelected(affairTicket: string): void {
    for (let i = 0; i < this.selectedAffairs.length; i++) {
      if (this.selectedAffairs[i].ticket === affairTicket)
        this.selectedAffairs.splice(i, 1);
    }

    return this.selectedAffairs$.next(this.selectedAffairs);
  }

  /**
   * Create new affair
   * @param affair - affair object
   * @returns {Observable<any>}
   */
  createAffair(affair: any): Observable<any> {
    return this.affairsHttpService.createAffair(affair)
      .do(() => this.getAffairs().subscribe(affairs => this.affairs$.next(affairs)));
  }

  /**
   * Remove an affair by the ticket number
   * @param {string} ticket - ticket number
   * @returns {Observable<any>}
   */
  removeAffair(ticket: string): Observable<any> {
    return this.affairsHttpService.removeAffair(ticket)
      .do(() => this.getAffairs().subscribe(affairs => this.affairs$.next(affairs)));
  }

  /**
   * Edit an existing affair by the ticket number
   * @param {string} ticket - ticket value
   * @param affairData - new affair data
   * @returns {Observable<any>}
   */
  editAffair(ticket:string, affairData: any): Observable<any> {
    let newAffair = {
      name: affairData.name,
      surname: affairData.surname,
      fatherName: affairData.fatherName
    };

    return this.affairsHttpService.updateAffair(ticket, newAffair)
      .do(() => this.getAffairs().subscribe(affairs => this.affairs$.next(affairs)));
  }
}
