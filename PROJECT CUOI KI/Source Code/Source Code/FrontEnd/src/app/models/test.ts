import { Time } from '@angular/common';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export interface Test {
    id: number;
    startdate: Date;
    enddate: Date;
    time: number;
    code: number;
    starttime: Time;
    status: boolean;
    subjectid:number;
}
