import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import AuthenticationService from "../../_services/authentication.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(AuthenticationService) private authService: AuthenticationService) {
    this.signInForm = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get login() {
    return this.signInForm.get('login');
  }

  get password() {
    return this.signInForm.get('password');
  }

  signIn($event) {
    $event.preventDefault();

    this.authService.login(this.login.value, this.password.value)
      .subscribe(user => {
        console.log("User authorization complete");
        console.log(user);
      });
  }

  ngOnInit() {

  }
}
