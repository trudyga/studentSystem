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

    this.affairsService.affairs$.subscribe(affairs => {
        console.log('Get affairs');
        this.affairs = affairs;
      });
  }

  ngOnInit() {
    this.affairsHttpService.getAffairs()
      .subscribe(affairs => {
        this.affairs = affairs;
      });
  }

  selectAffair(affair, $event) {
    $event.preventDefault();
    console.log(affair.selected);
    console.log(this.affairs);
    affair.selected = !affair.selected;
    if (affair.selected)
      this.affairsService.addToSelected(affair);
    else
      this.affairsService.removeFromSelected(affair.ticket);
  }

  deleteAffair($event) {
    $event.preventDefault();

    return this.affairs.filter(affair => affair.selected)
      .forEach(affair => {
        this.affairsService.removeAffair(affair.ticket).subscribe((res) => {});
      });
  }
}
