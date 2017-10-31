import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import AffairsHttpService from "../../_services/affairs.http.service";
import AffairsService from "../../_services/affairs.service";

@Component({
  selector: 'app-affair-add',
  templateUrl: './affair-add.component.html',
  styleUrls: ['./affair-add.component.css']
})
export class AffairAddComponent implements OnInit {
  affairAddForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(AffairsService) private affairsHttpService: AffairsHttpService,
              private affairsService: AffairsService) {
    this.affairAddForm = fb.group({
      ticket: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      fatherName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get ticket() {
    return this.affairAddForm.get('ticket');
  }
  get name() {
    return this.affairAddForm.get('name');
  }
  get surname() {
    return this.affairAddForm.get('surname');
  }
  get fatherName() {
    return this.affairAddForm.get('fatherName');
  }

  createAffair($event) {
    $event.preventDefault();

    this.affairsService.createAffair(this.affairAddForm.value)
      .subscribe(affair => {
        console.log(affair);
      });
  }
}
