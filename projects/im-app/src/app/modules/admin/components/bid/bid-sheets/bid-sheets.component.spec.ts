import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSheetsComponent } from './bid-sheets.component';

describe('BidSheetComponent', () => {
  let component: BidSheetsComponent;
  let fixture: ComponentFixture<BidSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
