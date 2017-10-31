import {Inject, Injectable} from "@angular/core";
import AffairsHttpService from "./affairs.http.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export default class AffairsService {
  public affairs$: BehaviorSubject<any[]>;
  affairs: any[];

  constructor(@Inject(AffairsHttpService) private affairsHttpService: AffairsHttpService) {
    this.affairs = [];
    this.affairs$ = BehaviorSubject.create();
  }

  getAffairs() {
    this.affairsHttpService.getAffairs()
      .subscribe(affairs => {
        this.affairs$.next(affairs);
        this.affairs = affairs;
      });
  }

  editAffair(ticket, affairData) {
    let newAffair = {
      ticket,
      name: affairData.name,
      surname: affairData.surname,
      fatherName: affairData.fatherName
    };

    return this.affairsHttpService.removeAffair(ticket)
      .map(() => this.affairsHttpService.createAffair(newAffair))
      .map(() => this.getAffairs());
  }

  createAffair(affair: any) {
    return this.affairsHttpService.createAffair(affair)
      .map(() => this.getAffairs());
  }

  removeAffair(ticket: string) {
    this.affairsHttpService.removeAffair(ticket)
      .map(() => this.getAffairs());
  }
}
