import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';

import { BidArea, BidAreaEdit, BidItem, BidSheet } from '../../../models/bidsheet.model';
import { BidSheetService } from '../../../services/bid-sheet.service';
import { BidItemEditComponent } from '../bid-item-edit/bid-item-edit.component';
import { BidAreaEditComponent } from '../bid-area-edit/bid-area-edit.component';

@Component({
  selector: 'app-bid-sheet',
  templateUrl: './bid-sheet.component.html',
  styleUrls: ['./bid-sheet.component.scss'],
})
export class BidSheetComponent implements OnInit, OnChanges {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  @Input() bidId?: number;

  data?: BidSheet;
  showAll: boolean = false;
  showDeleted: boolean = false;
  showRow: boolean = false;

  constructor(
    public dialog: MatDialog,
    private service: BidSheetService) { }

  ngOnInit(): void {
//    this.getItem();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getItem();
  }

  getItem() {
    if (this.bidId) {
      this.service.get(this.bidId).subscribe((item) => {
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
        this.update();
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
        this.update();
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
    let area: BidAreaEdit  = {
      id: 0,
      name: "",
      description: "",
      notes: "",
      row: 0,
      deleted: false,
    };
    const dialogRef = this.dialog.open(BidAreaEditComponent, {
      width: '700px',
      data: area
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.data?.areas.push(result);
        this.update();
      }
    });
  }

  editArea($event: any, area: BidArea) {
    $event.stopPropagation();
    const {items, ...edit} = area;
    const dialogRef = this.dialog.open(BidAreaEditComponent, {
      width: '700px',
      data: edit });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        area = Object.assign(area, result);
        this.update();
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


  update() {
    const edit: BidSheet = JSON.parse(JSON.stringify(this.data))
    this.service.put(edit.jobId, edit).subscribe((item) => {
      this.getItem();
    });

  }
}
