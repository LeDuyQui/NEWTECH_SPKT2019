import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { SemesterService } from '../../services/semester.service';
import { Class } from '../../models/class';
import { Semester } from '../../models/semester';
import { Router } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.scss']
})
export class StudentClassComponent implements OnInit {
  classes : [Class]
  class: Class
  semesters: [Semester]
  semester: Semester
  currentStudent= 1
  constructor(
    private classService: ClassService,
    private semesterService: SemesterService,
    private pnotifyService: PnotifyService,
    private router: Router
  ) { }

  ngOnInit() {
    // lay ra lop hoc cua sinh vien
    this.semesterService.listClassByStudent(this.currentStudent.toString()).subscribe(res => {
      this.semesters = res.data;
    })
  }
  detail(event,id) {
    this.router.navigate(['/studentsubject', id]);
  }

}
