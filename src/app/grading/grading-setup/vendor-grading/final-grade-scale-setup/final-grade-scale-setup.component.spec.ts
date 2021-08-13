/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinalGradeScaleSetupComponent } from './final-grade-scale-setup.component';

describe('FinalGradeScaleSetupComponent', () => {
  let component: FinalGradeScaleSetupComponent;
  let fixture: ComponentFixture<FinalGradeScaleSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalGradeScaleSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalGradeScaleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
