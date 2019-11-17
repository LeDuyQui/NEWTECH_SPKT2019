import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test';
import { PnotifyService } from './../../utils/pnotify.service';
import { Subject } from 'rxjs';
import { Subjects } from '../../models/subject';
import { SubjectService } from '../../services/subject.service';


@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.scss']
})
export class StudentTestComponent implements OnInit {

  id: string;
  tests: [Test];
  subjects: [Subjects];
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService, private pNotifyService: PnotifyService, private subjectService: SubjectService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.testService.listBySubjectAndStatus(this.id,false).subscribe(res => {
      this.tests = res.data;
    })
    
  }
  detail(id) {
    
  }

}
