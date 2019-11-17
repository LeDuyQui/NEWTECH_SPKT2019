import { Component, OnInit, ViewChild} from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test';
import { Router, ActivatedRoute } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-lecture-subject',
  templateUrl: './lecture-subject.component.html',
  styleUrls: ['./lecture-subject.component.scss']
})
export class LectureSubjectComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  tests: [Test];
  test: Test = { id: 0} as Test;
  action: string;
  form: FormGroup;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    private pnotifyService: PnotifyService,
    private fb: FormBuilder
    ) { this.id = this.route.snapshot.paramMap.get('id'); 
    this.form = this.fb.group({
      /*username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      fullName: ['', Validators.required],
      identitycard: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],*/
      birthday: new FormControl(new Date()),
      birthday2: new FormControl(new Date()),
      /*sex: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
      usertypeid: ['', Validators.required]*/
    })
  }
    
  
  ngOnInit() {
   
  }
  openAdd() {
    this.action = 'Add';
    this.test = {id: 0} as Test;
    this.editModal.show();
  }
  hideModal() {
    this.editModal.hide();
  }
  loadTest(status){
    this.testService.listBySubjectAndStatus(this.id,status).subscribe(res=>{
      this.tests=res.data;
    })
  }
  save() {
    var startDate = new Date();
    startDate.setDate(new Date(this.test.startdate).getDate());
    this.test.startdate= startDate;
    var endDate = new Date();
    endDate.setDate(new Date(this.test.enddate).getDate());
    this.test.enddate= endDate;
    this.test.status=false;
    this.test.subjectid=Number(this.id);
    //console.log(this.test.time);
    //this.test.enddate.setDate(new Date(this.test.enddate).getDate()+1);
    //this.test.enddate.day+=1;
    this.testService.save(this.test).subscribe((res => {
      if (res.errorCode === 0) {
        console.log(res.data)
        this.editModal.hide();
        this.test = {id: 0} as Test;
        this.loadTest(false);
        this.pnotifyService.success('Info', 'Update sucsess');
      } else {
        this.pnotifyService.error('Info', 'Update failed');
      }
    }), err => {
      this.pnotifyService.error('Info', 'Update failed');
    });
  }
  openEdit(id) {
    event.preventDefault();
    this.action = 'Edit';
    // load data here by id, then show dialog
    this.testService.get(id).subscribe(res => {
      this.test = res.data;
      console.log(res.data);
      this.editModal.show();
    });
    
  }
  detail(event,id) {
    event.preventDefault();
    this.router.navigate(['/mytest',id]);
  }
}
