import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';

import { BidArea, BidItem, BidSheet } from '../../../models/bidsheet.model';
import { BidSheetService } from '../../../services/bid-sheet.service';
import { BidItemEditComponent } from '../bid-item-edit/bid-item-edit.component';
import { BidAreaEditComponent } from '../bid-area-edit/bid-area-edit.component';

@Component({
  selector: 'app-bid-sheet',
  templateUrl: './bid-sheet.component.html',
  styleUrls: ['./bid-sheet.component.scss'],
})
export class BidSheetComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  @Input() jobId?: number;

  data?: BidSheet;
  showAll: boolean = false;
  showDeleted: boolean = false;
  showRow: boolean = false;

  constructor(
    public dialog: MatDialog,
    private service: BidSheetService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    if (this.jobId) {
      this.service.get(this.jobId).subscribe((item) => {
        this.data = item;
        console.log(this.data);
      });
    }
  }

  hide(item: BidItem): boolean {
    return (item.deleted && !this.showDeleted) || (!item.ours && !this.showAll);
  }

  hideArea(area: BidArea): boolean {
    let anyNotDeleted: boolean = area.items.some(function (x) { return !x.deleted; });
    let anyOurs: boolean = area.items.some(function (x) { return x.ours });

    return (!anyNotDeleted && !this.showDeleted) || (!anyOurs && !this.showAll) || (area.deleted && !this.showDeleted);

  }

  editItem(item: BidItem) {
    const dialogRef = this.dialog.open(BidItemEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(item))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        item = Object.assign(item, result);
      }
    });

  }

  addItem($event: any, area: BidArea) {
    $event.stopPropagation();
    let item: BidItem ;
    const dialogRef = this.dialog.open(BidItemEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(""))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        area.items.push(result);
      }
    });

  }

  deleteItem(item: BidItem) {
    item.deleted = true;
  }

  restoreItem(item: BidItem) {
    item.deleted = false;
  }

  addArea() {
    let area: BidArea ;
    const dialogRef = this.dialog.open(BidAreaEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(""))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.data?.areas.push(result);
      }
    });
  }

  editArea($event: any, area: BidArea) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(BidAreaEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(area))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        area = Object.assign(area, result);
      }
    });

  }

  deleteArea($event:any, area: BidArea) {
    $event.stopPropagation();
    area.deleted = true;
    console.log(area);
  }

  restoreArea($event:any, area: BidArea) {
    $event.stopPropagation();
        area.deleted = false;
  }


}
