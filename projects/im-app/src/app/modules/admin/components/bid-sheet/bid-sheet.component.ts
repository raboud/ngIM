import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BidArea, BidItem, BidSheet } from '../../models/bidsheet.model';
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
  showAll: boolean = false;
  showDeleted: boolean = false;
  showRow: boolean = false;

  constructor(private service: BidSheetService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.service.get(this.jobId).subscribe((item) => {
      this.data = item;
      console.log(this.data);
    });
  }

  hide(item: BidItem): boolean {
    return (item.deleted && !this.showDeleted) || (!item.ours && !this.showAll);
  }

  hideArea(area: BidArea): boolean {
    let anyNotDeleted: boolean = area.items.some(function (x) { return !x.deleted; });
    let anyOurs: boolean = area.items.some(function (x) { return x.ours });

    return (!anyNotDeleted && !this.showDeleted) || (!anyOurs && !this.showAll);

  }

  editItem(item: BidItem){

  }

  deleteItem(item: BidItem){
    item.deleted = true;
  }

  restoreItem(item: BidItem){
    item.deleted = false;
  }
}
