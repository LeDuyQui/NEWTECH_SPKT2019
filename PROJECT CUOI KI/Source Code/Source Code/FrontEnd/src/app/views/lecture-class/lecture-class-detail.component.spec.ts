import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureClassDetailComponent } from './lecture-class-detail.component';

describe('LectureClassDetailComponent', () => {
  let component: LectureClassDetailComponent;
  let fixture: ComponentFixture<LectureClassDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureClassDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
