import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes} from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AffairsComponent } from './affairs/affairs.component';
import { InDevelopmentComponent } from './in-development/in-development.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import UsersService from "../_services/users.service";
import AuthenticationService from "../_services/authentication.service";
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from "../_guards/auth-guard.guard";
import { AffairAddComponent } from './affair-add/affair-add.component';
import { AffairEditComponent } from './affair-edit/affair-edit.component';
import { ReportsComponent } from './reports/reports.component';
import AffairsHttpService from "../_services/affairs.http.service";
import AffairsService from "../_services/affairs.service";
import ReportsHttpService from "../_services/reports.http.service";

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'affairs',
    component: AffairsComponent,
    children: [
      { path: 'add', component: AffairAddComponent },
      { path: 'edit', component: AffairEditComponent },
    ],
  },
  {
    canActivate: [AuthGuard],
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'in-development',
    component: InDevelopmentComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

const ApiEndpoint = 'http://localhost:3080';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    HomeComponent,
    AffairsComponent,
    InDevelopmentComponent,
    SignUpComponent,
    SignInComponent,
    AffairAddComponent,
    AffairEditComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: 'API_ENDPOINT', useValue: ApiEndpoint
    },
    {
      provide: UsersService, useClass: UsersService
    },
    {
      provide: AuthenticationService, useClass: AuthenticationService
    },
    {
      provide: AuthGuard, useClass: AuthGuard
    },
    {
      provide: AffairsHttpService, useClass: AffairsHttpService
    },
    {
      provide: AffairsService, useClass: AffairsService
    },
    {
      provide: ReportsHttpService, useClass: ReportsHttpService
    }
  ],
  entryComponents: [
    SignUpComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
