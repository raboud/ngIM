import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';

import { SummaryArea, SummaryAreaEdit, SummaryItem, SummaryItemEdit, Summary, SummaryItemArea, SummaryItemAreaEdit } from '../../../models/summary.model';
import { BidSheetService } from '../../../services/bid-sheet.service';
import { SummaryItemEditComponent } from '../summary-item-edit/summary-item-edit.component';
import { SummaryAreaEditComponent } from '../summary-area-edit/summary-area-edit.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnChanges {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  @Input() bidId?: number;

  data?: Summary;
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
      this.service.getSummary(this.bidId).subscribe((item) => {
        this.data = new Summary(item.jobId, item.preliminary, item.items);
        console.log(this.data);
      });
    }
  }

  isDeleted(item: SummaryItem) : boolean
  {
    return item.itemAreas.every(x => x.deleted);
  }

  hide(itemArea: SummaryItemArea): boolean {
    return ((itemArea.area.deleted || itemArea.deleted) && !this.showDeleted) ||
      (!itemArea.ours && !this.showAll);
  }

  hideItem(item: SummaryItem): boolean {
    let anyNotDeleted: boolean = item.itemAreas.some(function (x) { return !x.deleted; });
    let anyOurs: boolean = item.itemAreas.some(function (x) { return x.ours });

    return (!anyNotDeleted && !this.showDeleted) || (!anyOurs && !this.showAll);

  }

  editArea(item: SummaryItemArea, itemId: number) {
    const dataIn: SummaryItemAreaEdit = JSON.parse(JSON.stringify(item));
    dataIn.bidItemId = itemId;

    const dialogRef = this.dialog.open(SummaryAreaEditComponent, {
      width: '700px',
      data: dataIn
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        item = Object.assign(item, result);
        this.update();
      }
    });

  }

  addArea($event: any, item: SummaryItem) {
    $event.stopPropagation();
    let area: SummaryItemArea ;
    const dialogRef = this.dialog.open(SummaryAreaEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(""))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        item.itemAreas.push(result);
        this.update();
      }
    });

  }

  deleteArea(area: SummaryItemArea) {
    area.deleted = true;
  }

  restoreArea(area: SummaryItemArea) {
    area.deleted = false;
  }

  addItem() {
    let item: SummaryItemEdit  = {
      id: 0,
      categoryId: 0,
      description: "",
    };
    const dialogRef = this.dialog.open(SummaryItemEditComponent, {
      width: '700px',
      data: item
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.data?.items.push(result);
        this.update();
      }
    });
  }

  editItem($event: any, item: SummaryItem) {
    $event.stopPropagation();
    const {itemAreas, ...edit} = item;
    const dialogRef = this.dialog.open(SummaryItemEditComponent, {
      width: '700px',
      data: edit });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        item = Object.assign(item, result);
        this.update();
      }
    });

  }

  deleteItem($event:any, item: SummaryItem) {
    $event.stopPropagation();
    item.itemAreas.forEach((itemArea) => itemArea.deleted = true);
    console.log(item);
  }

  restoreItem($event:any, item: SummaryItem) {
    $event.stopPropagation();
    item.itemAreas.forEach((itemArea) => itemArea.deleted = false);
  }


  update() {
    const edit: Summary = JSON.parse(JSON.stringify(this.data))
//    this.service.put(edit.jobId, edit).subscribe((item) => {
//      this.getItem();
//    });

  }
}
