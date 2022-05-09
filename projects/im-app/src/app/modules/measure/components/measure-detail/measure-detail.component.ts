import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Measure, MeasureEdit, MeasureItem, MeasureItemEdit, MeasureRoom, MeasureRoomEdit } from '../../models/measure.model';
import { MeasureService } from '../../services/measure.service';
import { MeasureItemEditComponent } from '../measure-item-edit/measure-item-edit.component';
import { MeasureRoomEditComponent } from '../measure-room-edit/measure-room-edit.component';

@Component({
  selector: 'app-measure-detail',
  templateUrl: './measure-detail.component.html',
  styleUrls: ['./measure-detail.component.scss']
})
export class MeasureDetailComponent implements AfterViewInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  @Input() jobId: number = 0;

  data: Measure | undefined = undefined;
  showDeleted = false;

  constructor(public dialog: MatDialog, private service: MeasureService) { }

  ngAfterViewInit(): void {
    console.log('MeasureDetail AfterViewInit');
    this.getItem();
  }

  getItem() {
    console.log(this.jobId);
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

  hide(room: MeasureRoom): boolean {
    return (room.deleted && !this.showDeleted);
  }

  hideItem(item: MeasureItem): boolean {
    return (item.deleted && !this.showDeleted);
  }

  addRoom($event: any, area: MeasureItem) {
    $event.stopPropagation();
    const room: MeasureRoomEdit = {
      id: 0,
      room: "",
      description: "",
      disconnected: false,
      leftToRight: false,
      floor: 0,
      deleted: false,
      cuts: [],
      transitions: []
    }

    const dialogRef = this.dialog.open(MeasureRoomEditComponent, {
      width: '700px',
      data: room
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        area.rooms.push(result);
        this.updateMeasure();
      }
    });

  }

  deleteRoom(item: MeasureRoom) {
    item.deleted = true;
    this.updateMeasure();
  }

  editRoom(item: MeasureRoom) {
    const dialogRef = this.dialog.open(MeasureRoomEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(item))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        item = Object.assign(item, result);
        this.updateMeasure();
      }
    });

  }

  restoreRoom(item: MeasureRoom) {
    item.deleted = false;
    this.updateMeasure();
  }

  addMaterial() {
    const dialogRef = this.dialog.open(MeasureItemEditComponent, {
      width: '700px',
      data: JSON.parse(JSON.stringify(""))
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.data?.items.push(result);
        this.updateMeasure();
      }
    });
  }

  deleteMaterial($event: any, area: MeasureItem) {
    $event.stopPropagation();
    area.deleted = true;
    this.updateMeasure();

    console.log(area);
  }

  editMaterial($event: any, material: MeasureItem) {
    $event.stopPropagation();
    const { rooms, ...edit } = material;
    console.log(edit);
    const dialogRef = this.dialog.open(MeasureItemEditComponent, {
      width: '700px',
      data: edit
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        material = Object.assign(material, result);
        this.updateMeasure();
      }
    });

  }

  restoreMaterial($event: any, area: MeasureItem) {
    $event.stopPropagation();
    area.deleted = false;
    this.updateMeasure();
  }


  updateMeasure() {
    const edit: MeasureEdit = JSON.parse(JSON.stringify(this.data))
    this.service.put(edit.jobId, edit).subscribe((item) => {
      this.getItem();
    });

  }

}
