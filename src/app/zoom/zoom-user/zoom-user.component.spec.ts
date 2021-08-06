import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomUserComponent } from './zoom-user.component';

describe('ZoomUserComponent', () => {
  let component: ZoomUserComponent;
  let fixture: ComponentFixture<ZoomUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
