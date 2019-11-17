import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTestdetailComponent } from './student-testdetail.component';

describe('StudentTestdetailComponent', () => {
  let component: StudentTestdetailComponent;
  let fixture: ComponentFixture<StudentTestdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTestdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
