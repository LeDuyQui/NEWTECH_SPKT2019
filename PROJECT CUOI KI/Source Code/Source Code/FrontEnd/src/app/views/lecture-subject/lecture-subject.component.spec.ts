import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureSubjectComponent } from './lecture-subject.component';

describe('LectureSubjectComponent', () => {
  let component: LectureSubjectComponent;
  let fixture: ComponentFixture<LectureSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
