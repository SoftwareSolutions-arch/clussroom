import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomSidebarComponent } from './zoom-sidebar.component';

describe('ZoomSidebarComponent', () => {
  let component: ZoomSidebarComponent;
  let fixture: ComponentFixture<ZoomSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
