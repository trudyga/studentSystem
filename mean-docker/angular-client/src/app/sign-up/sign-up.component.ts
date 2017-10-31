import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import UsersService from "../../_services/users.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  closeResult: string;
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, @Inject(UsersService) private usersService: UsersService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.signUpForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      fatherName: ['', Validators.required],
      phone: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  register($event) {
    $event.preventDefault();

    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.usersService.createUser(this.signUpForm.value)
        .subscribe(user => {
          console.log(`User ${user.username} was created`);
        }, err => {console.error(err);});
    }
  }

  get login() {
    return this.signUpForm.get('login');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get surname() {
    return this.signUpForm.get('surname');
  }

  get fatherName() {
    return this.signUpForm.get('fatherName');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get department() {
    return this.signUpForm.get('department');
  }
}
