import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSubMenuComponent } from './login-sub-menu.component';

describe('MsalLibComponent', () => {
  let component: LoginSubMenuComponent;
  let fixture: ComponentFixture<LoginSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
