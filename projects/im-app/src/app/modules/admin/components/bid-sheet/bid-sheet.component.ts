import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BidSheet } from '../../models/bidsheet.model';
import { BidSheetService } from '../../services/bid-sheet.service';

@Component({
  selector: 'app-bid-sheet',
  templateUrl: './bid-sheet.component.html',
  styleUrls: ['./bid-sheet.component.scss'],
})
export class BidSheetComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() jobId: number;
  data: BidSheet;

  constructor(private service: BidSheetService) {}

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.service.get(this.jobId).subscribe((item) => {
      this.data = item;
      console.log(this.data);
    });
  }
}
