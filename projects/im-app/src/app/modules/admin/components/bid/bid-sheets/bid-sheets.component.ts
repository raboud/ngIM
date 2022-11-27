import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';

import { JobService } from '../../../../shared/services/job.service';
import { BidSheetList } from '../../../../shared/models/jog-detail.model';

@Component({
  selector: 'app-bid-sheets',
  templateUrl: './bid-sheets.component.html',
  styleUrls: ['./bid-sheets.component.scss'],
})
export class BidSheetsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  @Input() jobId?: number;

  data: BidSheetList[] = [];
  showDeleted: boolean = false;
  selectedId: number = 0;
  summary: boolean = true;

  constructor(
    private service: JobService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    if (this.jobId) {
      this.service.getBidList(this.jobId).subscribe((item) => {
        this.data = item;
        if (this.data.length > 0){
          this.selectedId = this.data[0].id;
        }

      });
    }
  }

  hide(bid: BidSheetList): boolean {
    return !this.showDeleted && bid.deleted;
  }

  edit(bid: BidSheetList){
    this.selectedId = bid.id;
  }

  delete(bid: BidSheetList){

    bid.deleted = true;
  }

  restore(bid: BidSheetList){
    bid.deleted = false;
  }



}
