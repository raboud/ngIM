import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureDetailComponent } from './measure-detail.component';

describe('MeasureComponent', () => {
  let component: MeasureDetailComponent;
  let fixture: ComponentFixture<MeasureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
