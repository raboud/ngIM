import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureItemEditComponent } from './measure-item-edit.component';

describe('MeasureItemEditComponent', () => {
  let component: MeasureItemEditComponent;
  let fixture: ComponentFixture<MeasureItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
