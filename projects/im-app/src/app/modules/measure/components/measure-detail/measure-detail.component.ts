import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Measure, MeasureItem, MeasureRoom, MeasureRoomEdit } from '../../models/measure.model';
import { MeasureService } from '../../services/measure.service';
import { MeasureItemEditComponent } from '../measure-item-edit/measure-item-edit.component';
import { MeasureRoomEditComponent } from '../measure-room-edit/measure-room-edit.component';

@Component({
  selector: 'app-measure-detail',
  templateUrl: './measure-detail.component.html',
  styleUrls: ['./measure-detail.component.scss']
})
export class MeasureDetailComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  @Input() jobId: number = 0;

  data: Measure | null = null;

  constructor( public dialog: MatDialog, private service: MeasureService) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this.service.get(this.jobId).subscribe((item) => {
      this.data = item;
      console.log(this.data);
    })
  }

  create() {
    this.service.create(this.jobId).subscribe((item) => {
      this.data = item;
      console.log(this.data);
    })
  }

  hide(item: MeasureRoom): boolean {
    return false; //(item.deleted && !this.showDeleted) || (!item.ours && !this.showAll);
  }

  hideArea(area: MeasureItem): boolean {
//    let anyNotDeleted: boolean = area.items.some(function (x) { return !x.deleted; });
//    let anyOurs: boolean = area.items.some(function (x) { return x.ours });

    return false; //(!anyNotDeleted && !this.showDeleted) || (!anyOurs && !this.showAll);

  }

  editRoom(item: MeasureRoomEdit) {
    const dialogRef = this.dialog.open(MeasureRoomEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(item))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        item = Object.assign(item, result);
      }
    });

  }

  addRoom($event: any, area: MeasureItem) {
    $event.stopPropagation();
    let item: MeasureItem ;
    const dialogRef = this.dialog.open(MeasureRoomEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(""))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        area.rooms.push(result);
      }
    });

  }

  deleteRoom(item: MeasureRoom) {
    item.deleted = true;
  }

  restoreRoom(item: MeasureRoom) {
    item.deleted = false;
  }

  addMaterial() {
    let area: MeasureItem ;
    const dialogRef = this.dialog.open(MeasureItemEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(""))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.data?.items.push(result);
      }
    });
  }

  editMaterial($event: any, material: MeasureItem) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(MeasureItemEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(material))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        material = Object.assign(material, result);
      }
    });

  }

  deleteMaterial($event:any, area: MeasureItem) {
    $event.stopPropagation();
    area.deleted = true;
    console.log(area);
  }

  restoreMaterial($event:any, area: MeasureItem) {
    $event.stopPropagation();
        area.deleted = false;
  }


}
