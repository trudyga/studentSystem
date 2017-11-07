import {Component, Inject, OnInit} from '@angular/core';
import ReportsHttpService from "../../_services/reports.http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import AffairsService from "../../_services/affairs.service";
import AuthenticationService from "../../_services/authentication.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  // public reports = [
  //   {
  //     id: '342sdf2r32',
  //     title: 'Sample report',
  //     type: 'Affairs Overview',
  //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     author: 'me',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },
  //   {
  //     id: '342sdf2r312',
  //     title: 'Sample report1',
  //     type: 'Affairs Overview',
  //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     author: 'Vlad',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },
  //   {
  //     id: '342sdf2r3322',
  //     title: 'Sample report2',
  //     type: 'Affairs Overview',
  //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     author: 'Vlad',
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }
  // ];
  public reports = [];

  public reportForm: FormGroup;

  constructor(private fb: FormBuilder,
              @Inject(ReportsHttpService) private reportsHttpService: ReportsHttpService,
              @Inject(AffairsService) private affairsService: AffairsService,
              @Inject(AuthenticationService) private authenticationService: AuthenticationService) {
    this.reportsHttpService.getReports().subscribe(reports => {
      this.reports = reports.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
    });

    this.reportForm = fb.group({
      type: ['Affairs Overview', Validators.required],
      title: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createReport($event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.affairsService.getAffairs()
      .subscribe(affairs => {
        let thisMonthAffairs = affairs.filter(affair => {
          console.log(affair);
          console.log(new Date(+new Date(affair.createdAt) - Date.now()).getMonth());
          return new Date(+new Date(affair.createdAt) - Date.now()).getMonth() < 1
        });
        console.log('This month affairs');
        console.log(thisMonthAffairs);

        let content = `За последний месяц было зареестрировано ${thisMonthAffairs.length} личных дел студентов.`;
        content += `Всего студентов зареестрировано в системе ${affairs.length}`;

        let report = {
          type: this.reportForm.value.type,
          title: this.reportForm.value.title,
          content: content,
          author: this.authenticationService.getCurrentUser().login,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        console.log('Create report');
        console.log(report);

        return this.reportsHttpService.createReport(report)
          .flatMap(() => {
            console.log('Report was created');
            return this.reportsHttpService.getReports();
          })
          .subscribe(reports => {
            console.log(reports);
            this.reports = reports.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
          });
      });
  }

  removeReport(report: any) {
    this.reportsHttpService.removeReport(report.id)
      .subscribe(() => {
        console.log('Report successfully removed');
        return this.reportsHttpService.getReports().subscribe(reports => {
          console.log('Refresh reports list with new one');
          this.reports = reports.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
        });
      });
  }
}
