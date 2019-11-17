import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Student } from '../../models/student';
import { Page } from '../../models/page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { PnotifyService } from '../../utils/pnotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SemesterService } from '../../services/semester.service';
import { Semester } from '../../models/semester';
import { Class } from '../../models/class';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;

  userTypes: [Student];
  userTypeId: number = 0;
  action: string;
  readonly: boolean;
  class: Class = {} as Class;

  page: Page = { pageNumber: 0, pageSize: 5 } as Page;
  //
  sexs = [true, false];
  students: Student[] = [];
  student: Student = {} as Student;
  hidden: boolean;
  columns = [
    { name: 'Username', prop: 'name', sortTable: true },
    { name: 'Fullname', sortTable: true }
  ];
  //  customers: [Customer];

  form: FormGroup;
  id: number;
  semesters: [Semester];
  semester: Semester = {} as Semester;
  constructor(
    private studentService: StudentService,
    private semesterService: SemesterService,
    private classService: ClassService,
    private pnotifyService: PnotifyService,
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder
  ) {
    localStorage.setItem('classid', this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cmnd: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      school: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      code: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    })
  }

  ngOnInit() {
    console.log(localStorage.getItem('classid'));
    this.classService.get(+localStorage.getItem('classid')).subscribe(res => {
      this.class = res.data;
    })
    this.loadStudents();
  }

  setSemester(student: Student): Semester {
    this.semester.id=0;
    this.semester.semestername = "isc 10";
    this.semester.classid = +localStorage.getItem('classid');
    this.semester.studentid = student.id.toString();
    return this.semester;
  }

  loadStudents(page = null) {
    if (page != null) {
      this.page.pageNumber = page.offset;
    }
    // tslint:disable-next-line: triple-equals
    this.semesterService.getByType(+localStorage.getItem('classid'), this.page).subscribe(res => {
      this.page = res.pageInfo;
      this.semesters = res.data;
      //console.log(this.semesters);
    });
  }

  // save
  save() {
    console.log(this.student);
    if (this.student.id == 0) {
      this.studentService.save(this.student).subscribe(res => {
        
        if (res.errorCode === 0) {
          console.log(this.setSemester(res.data))
          this.semesterService.save(this.setSemester(res.data)).subscribe(semester => {
            if (res.errorCode === 0) {
              this.editModal.hide();
              this.loadStudents();
              this.student = {} as Student;
              this.pnotifyService.success('Student', 'Update susess');
            } else {
              this.pnotifyService.error('Student', 'Update failed1');
            }
          }, err => {
            this.pnotifyService.error('Student', 'Update failed2');
          });

        }
      }, err => {
        this.pnotifyService.error('Student', 'Update failed');
      });
    } else {
      this.studentService.put(this.student.id, this.student).subscribe(res => {
        if (res.errorCode === 0) {
          this.editModal.hide();
          this.loadStudents();
          this.student = {} as Student;

          this.pnotifyService.success('Student', 'Update susess');
        } else {
          this.pnotifyService.error('Student', 'Update failed1');
        }
      }, err => {
        this.pnotifyService.error('Student', 'Update failed2');
      });
    }
  }

  // delete
  delete(id) {
    event.preventDefault();
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.studentService.delete(id).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Student', 'Delete susess');
            this.loadStudents();
          } else {
            if (res.errorCode === 200) {
              this.pnotifyService.error('Student', 'Delete failed. Data is associated with other objects.');
            } else {
              this.pnotifyService.error('Student', 'Delete failed');
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
    this.hidden = false;
    this.readonly = false;
    this.student = { id: 0 } as Student;
    this.editModal.show();
  }
  openEdit(id) {
    event.preventDefault();
    this.action = 'Edit';
    this.readonly = true;
    this.hidden = true;
    // load data here by id, then show dialog
    this.studentService.get(id).subscribe(res => {
      this.student = res.data;
      this.editModal.show();
    });
  }
}
