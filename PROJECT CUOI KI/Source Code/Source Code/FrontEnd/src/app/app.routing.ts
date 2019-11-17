import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CustomerComponent } from './views/customer/customer.component';
import { CustomerTypeComponent } from './views/customer-type/customer-type.component';
import { AppGuard } from './app.guard';
import { UserTypeComponent } from './views/user-type/user-type.component';
import { UserComponent } from './views/user/user.component';
import { ClassComponent } from './views/class/class.component';
import { StudentComponent } from './views/student/student.component';
import { LectureDashboardComponent } from './views/lecture-dashboard/lecture-dashboard.component';
import { LectureClassComponent } from './views/lecture-class/lecture-class.component';
import { LectureClassDetailComponent } from './views/lecture-class/lecture-class-detail.component';
import { LectureSubjectComponent } from './views/lecture-subject/lecture-subject.component';
import { LectureTestDetailComponent } from './views/lecture-test-detail/lecture-test-detail.component';
import { StudentClassComponent } from './views/student-class/student-class.component';
import { StudentSubjectComponent } from './views/student-subject/student-subject.component';
import { StudentTestComponent } from './views/student-test/student-test.component';
import { SubjectComponent } from './views/subject/subject.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'myclasses',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'student',
    component: StudentClassComponent,
    data: {
      title: 'Student Page'
    }
  },
  {
    path: 'studentsubject/:id',
    component: StudentSubjectComponent,
    data: {
      title: 'Student Subject'
    }
  },
  {
    path: 'studenttest/:id',
    component: StudentTestComponent,
    data: {
      title: 'Student Test'
    }
  },
  {
    path: '',
    component: LectureDashboardComponent,
    data:{
      title: 'Lecture-Dashboard'
    },
    canActivate: [AppGuard],
    children:[
      {
        path: 'myclasses',
        component: LectureClassComponent,
      },
      {
        path: 'myclasses/:id',
        component: LectureClassDetailComponent,
      },
      {
        path: 'mysubject/:id',
        component: LectureSubjectComponent,
      },
      {
        path: 'mytest/:id',
        component: LectureTestDetailComponent,
      },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    //canActivate: [AppGuard],
    children: [
      //
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user-types',
        component: UserTypeComponent,
        data: {
          title: 'User type'
        }
      },
      {
        path: 'users',
        component: UserComponent,
        data: {
          title: 'User'
        }
      },
      {
        path: 'classes',
        component: ClassComponent,
        data: {
          title: 'Class'
        }
      },
      {
        path: 'students',
        component: StudentComponent,
        data: {
          title: 'Student'
        }
      },
      {
        path: 'students/:id',
        component: StudentComponent,
        data: {
          title: 'Student'
        }
      },
      {
        path: 'subjects/:id',
        component: SubjectComponent,
        data: {
          title: 'Subjects'
        }
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
