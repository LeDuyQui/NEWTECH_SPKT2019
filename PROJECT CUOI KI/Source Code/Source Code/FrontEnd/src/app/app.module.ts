import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
//
import { CustomerTypeComponent } from './views/customer-type/customer-type.component';
import { CustomerComponent } from './views/customer/customer.component';
import { UserComponent } from './views/user/user.component';
import { AppGuard } from './app.guard';
import { CookieService } from 'ngx-cookie-service';
import { AppInterceptor } from './app.interceptor';
import { UserTypeComponent } from './views/user-type/user-type.component';
import { ClassComponent } from './views/class/class.component';
import { SubjectComponent } from './views/subject/subject.component';
import { FormInputComponent } from './controls/form-input/form-input.component';
import { FormSelectComponent } from './controls/form-select/form-select.component';
import { StudentComponent } from './views/student/student.component';
import { LectureDashboardComponent } from './views/lecture-dashboard/lecture-dashboard.component';
import { LectureClassComponent } from './views/lecture-class/lecture-class.component';
import { LectureClassDetailComponent } from './views/lecture-class/lecture-class-detail.component';
import { LectureSubjectComponent } from './views/lecture-subject/lecture-subject.component';
import { LectureTestDetailComponent } from './views/lecture-test-detail/lecture-test-detail.component';
import { StudentClassComponent } from './views/student-class/student-class.component';
import { StudentSubjectComponent } from './views/student-subject/student-subject.component';
import { StudentTestComponent } from './views/student-test/student-test.component';
import { StudentTestdetailComponent } from './views/student-testdetail/student-testdetail.component';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgxDatatableModule,
    BrowserModule,
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    DataTablesModule,
    //
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    //
    CustomerTypeComponent,
    CustomerComponent,
    UserComponent,
    UserTypeComponent,
    ClassComponent,
    FormInputComponent,
    FormSelectComponent,
    StudentComponent,
    LectureDashboardComponent,
    LectureClassComponent,
    LectureClassDetailComponent,
    LectureSubjectComponent,
    LectureTestDetailComponent,
    StudentClassComponent,
    StudentSubjectComponent,
    StudentTestComponent,
    StudentTestdetailComponent,
    SubjectComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService,
    AppGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
