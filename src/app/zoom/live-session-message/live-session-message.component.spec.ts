import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSessionMessageComponent } from './live-session-message.component';

describe('LiveSessionMessageComponent', () => {
  let component: LiveSessionMessageComponent;
  let fixture: ComponentFixture<LiveSessionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveSessionMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSessionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
