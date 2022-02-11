import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeasuresComponent } from './my-measures.component';

describe('MyMeasuresComponent', () => {
  let component: MyMeasuresComponent;
  let fixture: ComponentFixture<MyMeasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMeasuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
