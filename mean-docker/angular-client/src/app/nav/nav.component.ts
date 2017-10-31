import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import AuthenticationService from "../../_services/authentication.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public title: string = 'Students System';
  public closeResult: string;

  constructor(private modalService: NgbModal, private authService: AuthenticationService) {

  }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then(result => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason => {
      this.closeResult = `Dismissed`;
    }));
  }

  get currentUser(): string {
    let user = this.authService.getCurrentUser();

    return user && user.login;
  }

  logout() {
    this.authService.logout();
  }
}
