import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidAreaEditComponent } from './bid-area-edit.component';

describe('BidAreaEditComponent', () => {
  let component: BidAreaEditComponent;
  let fixture: ComponentFixture<BidAreaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidAreaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidAreaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
