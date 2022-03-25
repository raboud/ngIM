import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Measure, MeasureItem, MeasureRoom } from '../../models/measure.model';
import { MeasureService } from '../../services/measure.service';

@Component({
  selector: 'app-measure',
  templateUrl: './measure-detail.component.html',
  styleUrls: ['./measure-detail.component.scss']
})
export class MeasureDetailComponent implements OnInit {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  @Input() jobId: number = 0;

  data: Measure | null = null;

  constructor(private service: MeasureService) { }

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

  deleteItem(item: MeasureItem) {
    item.deleted = true;
  }

  restoreItem(item: MeasureItem) {
    item.deleted = false;
  }

  editItem(item: MeasureItem){

  }

}
