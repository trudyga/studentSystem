import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import AffairsService from "../../_services/affairs.service";
import AffairsHttpService from "../../_services/affairs.http.service";

@Component({
  selector: 'app-affairs',
  templateUrl: './affairs.component.html',
  styleUrls: ['./affairs.component.css']
})
export class AffairsComponent implements OnInit {
  affairs: any[];

  constructor(private fb: FormBuilder,
              private affairsHttpService: AffairsHttpService,
              private affairsService: AffairsService) {
    this.affairsService.affairs$.subscribe(
      affairs => this.affairs = affairs
    );

    this.affairsHttpService.getAffairs()
      .subscribe(affairs => {
        this.affairs = affairs;
      });
  }

  ngOnInit() {
  }

  selectAffair(affair, $event) {
    $event.preventDefault();
    console.log(affair.selected);
    console.log(this.affairs);
    affair.selected = !affair.selected;
  }

  isAffairSelected(affair) {
    return affair.selected;
  }

  deleteAffair($event) {
    $event.preventDefault();

    this.affairs.filter(affair => affair.selected)
      .forEach(affair => {
        console.log(affair);
        console.log('Remove affair');
        this.affairsHttpService.removeAffair(affair.ticket);
      });

    this.affairs = this.affairs.filter(affair => !affair.selected);
  }
}
