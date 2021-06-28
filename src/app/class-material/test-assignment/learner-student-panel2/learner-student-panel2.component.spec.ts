/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearnerStudentPanel2Component } from './learner-student-panel2.component';

describe('LearnerStudentPanel2Component', () => {
  let component: LearnerStudentPanel2Component;
  let fixture: ComponentFixture<LearnerStudentPanel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerStudentPanel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerStudentPanel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
