import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SemesterService } from '../../services/semester.service';
import { Semester } from '../../models/semester';
import { PnotifyService } from './../../utils/pnotify.service';
import { Subject } from 'rxjs';
import { Subjects } from '../../models/subject';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.component.html',
  styleUrls: ['./student-subject.component.scss']
})
export class StudentSubjectComponent implements OnInit {
  id: string;
  semesters: [Semester];
  subjects: [Subjects];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Semester> = new Subject();
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private semesterService: SemesterService, private pNotifyService: PnotifyService, private subjectService: SubjectService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadSubject();
  }

  loadSubject() {                              // hien thi danh sach mon hoc cua lop
    this.subjectService.listSubjectsByClass(this.id).subscribe(res =>{
      this.subjects = res.data;
      console.log(res.data);
    });
  }
  detail(event,id) {
    event.preventDefault();
    this.router.navigate(['/studenttest', id]);
  }
}
