import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import AffairsHttpService from "../../_services/affairs.http.service";
import AffairsService from "../../_services/affairs.service";

@Component({
  selector: 'app-affair-edit',
  templateUrl: './affair-edit.component.html',
  styleUrls: ['./affair-edit.component.css']
})
export class AffairEditComponent implements OnInit {
  affairEditForm: FormGroup;
  affairs: any[];

  constructor(private fb: FormBuilder, private affairsService: AffairsService) {
    this.affairEditForm = fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      fatherName: ['', Validators.required]
    });

    this.affairs = this.affairsService.affairs;
  }

  ngOnInit() {
  }

  get ticket() {
    return this.affairEditForm.get('ticket');
  }
  get name() {
    return this.affairEditForm.get('name');
  }
  get surname() {
    return this.affairEditForm.get('surname');
  }
  get fatherName() {
    return this.affairEditForm.get('fatherName');
  }

  createAffair($event) {
    $event.preventDefault();

    return this.affairsService.createAffair(this.affairEditForm.value);
  }
}
