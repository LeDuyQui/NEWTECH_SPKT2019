import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { Subjects } from '../../models/subject';
import { Page } from '../../models/page';
import { SubjectService } from '../../services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html'
})
export class SubjectComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;

  action: string;
  id:string
  page: Page = { pageNumber: 0, pageSize: 5 } as Page;
  //
  subjects: Subjects[] = [];
  subject: Subjects = {} as Subjects;
  columns = [
    { name: 'Id', prop: 'id', sortTable: true },
    { name: 'classname', prop: 'userrole', sortTable: true },
    { name: 'userid', sortTable: true }
  ];
  //  customers: [Customer];

  form: FormGroup;

  constructor(
    private subjectService: SubjectService,
    private route : ActivatedRoute,
    private pnotifyService: PnotifyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.form = this.fb.group({
      subjectname: ['', Validators.required],
      level: ['', Validators.required],
      parentSub: ['', Validators.required],
    })
  }

  ngOnInit() {
    
    //console.log(this.id);
    this.loadSubjects();
  }

  loadSubjects(page = null) {
    if (page != null) {
      this.page.pageNumber = page.offset;
    }
    // tslint:disable-next-line: triple-equals

      this.subjectService.getByType(this.route.snapshot.paramMap.get('id'), this.page).subscribe(res => {
        this.page = res.pageInfo;
        this.subjects = res.data;
      });
  
  }

  loadData(id) {
    this.subjectService.get(id).subscribe(res => {
      this.subject = res.data;
    });
  }

  // save
  save() {
    
    this.subject.parentSub = null;
    this.subject.classid = Number(this.id);
    console.log(this.subject)
    this.subjectService.save(this.subject).subscribe((res => {
      if (res.errorCode === 0) {
        this.editModal.hide();
        this.loadSubjects();
        this.subject = {} as Subjects;
        this.pnotifyService.success('Subject', 'Update susess');
      } else {
        this.pnotifyService.error('Subject', 'Update failed');
      }
    }), err => {
      this.pnotifyService.error('Subject', 'Update failed');
    });
  }

  // delete
  delete(id) {
    event.preventDefault();
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.subjectService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            this.loadSubjects();
          } else {
            if (res.errorCode === 200) {
              this.pnotifyService.error('Info', 'Delete failed. Data is associated with other objects.');
            } else {
              this.pnotifyService.error('Info', 'Delete failed');
            }
          }
        });
      }
    });
  }

  // modals
  hideModal() {
    this.editModal.hide();
  }

  // show modal
  openAdd() {
    this.action = 'Add';
    this.subject = { id: 0 } as Subjects;
    this.editModal.show();
  }

  openEdit(id) {
    event.preventDefault();
    this.action = 'Edit';
    // load data here by id, then show dialog
    this.subjectService.get(id).subscribe(res => {
      this.subject = res.data;
      this.editModal.show();
    });
  }

  listStudents(id) {
    this.router.navigate(['students', id]);
  }
  
  listSubjects(id) {
    this.router.navigate(['subject', id]);
  }
}
