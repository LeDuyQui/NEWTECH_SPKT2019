//Tran Quang Anh (27/09/2019)
import { Component, OnInit, ViewChild} from '@angular/core';
import { TestService } from '../../services/test.service';
import { QuestionService } from '../../services/question.service';
import { OptionService } from '../../services/option.service';
import { TestDetailService } from '../../services/test-detail.service';
import { Test } from '../../models/test';
import { Option } from '../../models/option';
import { TestDetail } from '../../models/test-detail';
import { Router, ActivatedRoute } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Question } from '../../models/question';
import { nextSortDir } from '@swimlane/ngx-datatable';
import { stringify } from '@angular/compiler/src/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-lecture-test-detail',
  templateUrl: './lecture-test-detail.component.html',
  styleUrls: ['./lecture-test-detail.component.scss']
})
export class LectureTestDetailComponent implements OnInit {

  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  tests: [Test];
  testDetails: [TestDetail];
  options: [Option];
  questions: [Question];
  test: Test = { id: 0} as Test;
  testDetail: TestDetail = { id: 0} as TestDetail;
  question: Question = { id: 0} as Question;
  option: Option = { id: 0} as Option;
  option1: Option = { id: 0} as Option;
  option2: Option = { id: 0} as Option;
  option3: Option = { id: 0} as Option;
  option4: Option = { id: 0} as Option;
  action: string;
  form: FormGroup;
  id: string;
  correct: number;
  i: number;
  questionid: string;
  stt: string;
  
  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private optionService: OptionService,
    private questionService: QuestionService,
    private testDetailService: TestDetailService,
    private router: Router,
    private pnotifyService: PnotifyService,
    private fb: FormBuilder
    ) { this.id = this.route.snapshot.paramMap.get('id');
    this.form = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
      option1: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      option2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      option3: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      option4: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      iscorrect: ['', [Validators.required]],
    }) }

  ngOnInit() {
    this.correct = 1;
    //this.questionid="0";
    this.testService.get(this.id).subscribe(res=>{
      this.test = res.data;
      
    })
    
    this.testDetailService.listByTest(this.id).subscribe(res=>{
      this.testDetails = res.data;
    })
  }
  openAdd() {
    if(this.test.status == true)
    {
        this.pnotifyService.error('Info', 'Test Closed');
    }
    else
    {
    this.action = 'Add';
    this.question = {id: 0} as Question;
    //this.question.question = "aaaaaaaaaaa";
    //this.option = {id: 0} as Option;
    this.option1 = { id: 0} as Option;
    this.option2 = { id: 0} as Option;
    this.option3 = { id: 0} as Option;
    this.option4 = { id: 0} as Option;
    this.testDetail = {id: 0} as TestDetail;
    this.editModal.show();
    }
  }
  // modals
  hideModal() {
    this.editModal.hide();
  }
  openEdit(id) {
    if(this.test.status == true)
    {
        this.pnotifyService.error('Info', 'Test Closed');
    }
    else
    {
    this.action = 'Edit';
    // lay ra ten cau hoi // lay ra 4 option tat ca thong qua testDetail
    this.testDetailService.get(id).subscribe(res => {
      this.testDetail = res.data;
      console.log(this.testDetail);
      this.question = this.testDetail.question;
      this.questionid = this.question.id.toString();
      this.option1 = this.testDetail.question.options[0];
      this.option2 = this.testDetail.question.options[1];
      this.option3 = this.testDetail.question.options[2];
      this.option4 = this.testDetail.question.options[3];
      if(this.option1.isCorrect == true)
      {
        this.correct = 1;
      }
      if(this.option2.isCorrect == true)
      {
        this.correct = 2;
      }
      if(this.option3.isCorrect == true)
      {
        this.correct = 3;
      }
      if(this.option4.isCorrect == true)
      {
        this.correct = 4;
      }
      this.editModal.show();
    
    });
  }
  }
  save() {
    this.stt = "0";
    //console.log(this.correct);
    // them6 cau6 hoi3 truoc
    // du lieu cua cau hoi
    this.question.isShuffle = "false";
    this.question.questiontypeid = 2;
    this.question.subjectid = this.test.subjectid;
    console.log(this.question.subjectid)
    this.questionService.save(this.question).subscribe((res => {
      if (res.errorCode === 0) {
        console.log(res.data)
        //lay ra cau id cua cau hoi moi them vao
        
        this.questionService.listBySubject(this.test.subjectid).subscribe(res =>{
          this.questions = res.data;
          if(this.action == "Add")
          {
            for(this.i = 0; this.i < this.questions.length; this.i++)
            {
              this.questionid = this.questions[this.i].id.toString();
            }
            console.log(this.questionid);   // pass tram 1
          }
          console.log(this.questionid);
          // them tat ca cac option
          if(this.correct == 1)
          {
              this.option2.isCorrect = false;
              this.option3.isCorrect = false;
              this.option4.isCorrect = false;
              this.option1.isCorrect = true;
          }
          if(this.correct == 2)
          {
              this.option1.isCorrect = false;
              this.option3.isCorrect = false;
              this.option4.isCorrect = false;
              this.option2.isCorrect = true;
          }
          if(this.correct == 3)
          {
              this.option2.isCorrect = false;
              this.option1.isCorrect = false;
              this.option4.isCorrect = false;
              this.option3.isCorrect = true;
          }
          if(this.correct == 4)
          {
              this.option2.isCorrect = false;
              this.option3.isCorrect = false;
              this.option1.isCorrect = false;
              this.option4.isCorrect = true;
          }
          this.option1.questionid = this.questionid;
          this.option2.questionid = this.questionid;
          this.option3.questionid = this.questionid;
          this.option4.questionid = this.questionid;
          this.optionService.save(this.option1).subscribe((res=> {
            if (res.errorCode === 0) {
              console.log(res.data)                // pass tram 2
              this.optionService.save(this.option2).subscribe((res => {
                if (res.errorCode === 0) {
                    console.log(res.data)              // pass tram 3
                    this.optionService.save(this.option3).subscribe((res => {
                      if (res.errorCode === 0) {
                        console.log(res.data)             // pass tram 4
                        this.optionService.save(this.option4).subscribe((res => {
                          if (res.errorCode === 0) {
                            console.log(res.data)            // pass tram 5
                            if(this.action == "Edit")
                            {
                              //console.log("Amen");
                              this.editModal.hide();
                              this.testService.get(this.id).subscribe(res=>{
                                this.test = res.data;
                              })
                            
                              this.testDetailService.listByTest(this.id).subscribe(res=>{
                                this.testDetails = res.data;
                              })
                              this.pnotifyService.success('Info', 'Update success');
                            }
                            else
                            {
                                // them test detail, bao gom test va question
                                // lay So thu tu ra trc
                                this.testDetailService.listByTest(this.id).subscribe(res=>{
                                this.testDetails = res.data
                                //console.log(this.testDetails[0])
                                for(this.i =0; this.i< this.testDetails.length; this.i++)
                                {
                                  //console.log(this.i);
                                    this.stt = this.testDetails[this.i].STT.toString();
                                }
                                this.testDetail.STT = Number(this.stt)+1;
                                this.testDetail.questionid = Number(this.questionid);
                                this.testDetail.testid = Number(this.id);
                                this.testDetailService.save(this.testDetail).subscribe((res => {
                                if (res.errorCode === 0) {
                                  this.editModal.hide();
                                  this.testService.get(this.id).subscribe(res=>{
                                    this.test = res.data;
                                  })
                                  
                                  this.testDetailService.listByTest(this.id).subscribe(res=>{
                                    this.testDetails = res.data;
                                  })
                                  this.testDetail = {} as TestDetail;
                                  this.question = {} as Question;
                                  this.option1 = {} as Option;
                                  this.option2 = {} as Option;
                                  this.option3 = {} as Option;
                                  this.option4 = {} as Option;
                                  this.pnotifyService.success('Info', 'Add susess');
                                } else {
                                  this.pnotifyService.error('Info', 'Update failed');
                                }
                              }), err => {
                                this.pnotifyService.error('Info', 'Update failed');
                              });
                              })
                            }
                          } else {
                            this.pnotifyService.error('Info', 'Update failed');
                          }
                        }), err => {
                            this.pnotifyService.error('Info', 'Update failed');
                        });
                      } else {
                        this.pnotifyService.error('Info', 'Update failed');
                      }
                    }), err => {
                      this.pnotifyService.error('Info', 'Update failed');
                    });
                  } else {
                    this.pnotifyService.error('Info', 'Update failed');
                  }
                  }), err => {
                  this.pnotifyService.error('Info', 'Update failed');
                  });
            } else {
              this.pnotifyService.error('Info', 'Update failed');
            }
          }), err => {
            this.pnotifyService.error('Info', 'Update failed');
          });
          
            
         
            
            
        })
        
      
      } else {
        this.pnotifyService.error('Info', 'Update failed');
      }
    }), err => {
      this.pnotifyService.error('Info', 'Update failed');
    });
  }
  closeTest() {
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.test.status = true;
        this.testService.save(this.test).subscribe(res => {
          if (res.errorCode === 0) {
            this.pnotifyService.success('Info', 'OK');
            this.testService.get(this.id).subscribe(res=>{
              this.test = res.data;
              
            })
            
            this.testDetailService.listByTest(this.id).subscribe(res=>{
              this.testDetails = res.data;
            })
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
}
