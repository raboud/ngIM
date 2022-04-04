import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureRoomEditComponent } from './measure-room-edit.component';

describe('MeasureRoomEditComponent', () => {
  let component: MeasureRoomEditComponent;
  let fixture: ComponentFixture<MeasureRoomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureRoomEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureRoomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
