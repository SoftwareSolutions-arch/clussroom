import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomDashboardHeaderComponent } from './zoom-dashboard-header.component';

describe('ZoomDashboardHeaderComponent', () => {
  let component: ZoomDashboardHeaderComponent;
  let fixture: ComponentFixture<ZoomDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomDashboardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
