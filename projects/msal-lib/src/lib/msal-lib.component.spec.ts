import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsalLibComponent } from './msal-lib.component';

describe('MsalLibComponent', () => {
  let component: MsalLibComponent;
  let fixture: ComponentFixture<MsalLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsalLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsalLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
