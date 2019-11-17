import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SemesterService } from '../../services/semester.service';
import { Semester } from '../../models/semester';
import { PnotifyService } from './../../utils/pnotify.service';
import { Subject } from 'rxjs';
import { Subjects } from '../../models/subject';
import { SubjectService } from '../../services/subject.service';
@Component({
  selector: 'app-lecture-class-detail',
  templateUrl: './lecture-class-detail.component.html',
  styleUrls: ['./lecture-class-detail.component.scss']
})
export class LectureClassDetailComponent implements OnInit {

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
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7
    };
      this.loadPupil();
      this.loadSubject();
      
   }
  loadPupil() {                                   // hien thi danh sach hoc sinh cua lop
      this.semesterService.listPupilsByClass(this.id).subscribe(res =>{
        this.semesters = res.data;
        this.dtTrigger.next();
        console.log(res.data);
      });
    }
  loadSubject() {                              // hien thi danh sach mon hoc cua lop
    this.subjectService.listSubjectsByClass(this.id).subscribe(res =>{
      this.subjects = res.data;
      console.log(res.data);
    });
  }
  detail(event,id) {
    event.preventDefault();
    this.router.navigate(['/mysubject', id]);
  }
}