import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomHomeComponent } from './zoom-home.component';

describe('ZoomHomeComponent', () => {
  let component: ZoomHomeComponent;
  let fixture: ComponentFixture<ZoomHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
