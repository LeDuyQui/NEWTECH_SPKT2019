import { Component, OnInit, ViewChild} from '@angular/core';
import { ClassService } from '../../services/class.service';
import { Class } from '../../models/class';
import { Router } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';
import { ModalDirective } from 'ngx-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lecture-class',
  templateUrl: './lecture-class.component.html',
  styleUrls: ['./lecture-class.component.scss']
})
export class LectureClassComponent implements OnInit {

  currentLecture: string
  classes: [Class];
  class: Class = { id: 0} as Class;

  constructor(
    private classService: ClassService,
    private router: Router,
    private pnotifyService: PnotifyService,
    private cookieService: CookieService
    ) { }

  ngOnInit() {
    this.currentLecture = this.cookieService.get('teacherId')
    this.reloadData();

  }
  
  delete(event, id) {
    event.preventDefault();
    this.pnotifyService.showConfirm('Confirm', 'Are you sure?', yes => {
      if (yes) {
        this.classService.delete(id).subscribe( res => {
          if (res.errorCode === 0) {
            this.reloadData();
          }
        });
      }
    });
  }

  reloadData() {
    this.classService.listByLecture(Number(this.currentLecture)).subscribe(res => {
      this.classes = res.data;
      console.log(res.data);
    })
    
  }
  detail(event,id) {
    event.preventDefault();
    this.router.navigate(['/myclasses', id]);
  }
}
