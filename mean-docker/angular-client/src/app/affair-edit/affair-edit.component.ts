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
  private currentAffair: any;

  constructor(private fb: FormBuilder, private affairsService: AffairsService) {
    this.affairEditForm = fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      fatherName: ['', Validators.required]
    });

    this.affairsService.selectedAffairs$.subscribe(affairs => {
      console.log('An affair was selected');
      console.log(affairs);
      this.affairs = affairs;
      this.currentAffair = this.affairs ? this.affairs[0] : null;
      if (!this.currentAffair) {
        this.affairEditForm.controls['name'].setValue('');
        this.affairEditForm.controls['surname'].setValue('');
        this.affairEditForm.controls['fatherName'].setValue('');
        return;
      }

      this.affairEditForm.controls['name'].setValue(this.currentAffair.name);
      this.affairEditForm.controls['surname'].setValue(this.currentAffair.surname);
      this.affairEditForm.controls['fatherName'].setValue(this.currentAffair.fatherName);
    });
  }

  ngOnInit() {
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

  editAffair($event) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('Update affair value');
    console.log(this.affairEditForm.value);
    return this.affairsService.editAffair(this.currentAffair.ticket, this.affairEditForm.value)
      .subscribe(() => {});
  }
}
