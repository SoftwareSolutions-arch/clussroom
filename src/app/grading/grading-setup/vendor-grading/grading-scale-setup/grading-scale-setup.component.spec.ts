/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GradingScaleSetupComponent } from './grading-scale-setup.component';

describe('GradingScaleSetupComponent', () => {
  let component: GradingScaleSetupComponent;
  let fixture: ComponentFixture<GradingScaleSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingScaleSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingScaleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
