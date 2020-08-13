import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImLibComponent } from './im-lib.component';

describe('ImLibComponent', () => {
  let component: ImLibComponent;
  let fixture: ComponentFixture<ImLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
