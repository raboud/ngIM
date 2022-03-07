import { Component, Input, OnInit } from '@angular/core';
import { Measure } from '../../../models/measure.model';
import { MeasureService } from '../../../services/measure.service';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit {
  @Input() jobId: number;

  data: Measure;

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

}
