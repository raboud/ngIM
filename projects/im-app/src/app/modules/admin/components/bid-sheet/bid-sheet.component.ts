import { Component, Input, OnInit } from '@angular/core';
import { BidSheet } from '../../models/bidsheet.model';
import { BidSheetService } from '../../services/bid-sheet.service';

@Component({
  selector: 'app-bid-sheet',
  templateUrl: './bid-sheet.component.html',
  styleUrls: ['./bid-sheet.component.scss'],
})
export class BidSheetComponent implements OnInit {
  @Input() jobId: number;
  data: BidSheet;

  constructor(private service: BidSheetService) {}

  ngOnInit(): void {}

  getItem() {
    this.service.get(this.jobId).subscribe((item) => {
      this.data = item;
      console.log(this.data);
    });
  }
}
