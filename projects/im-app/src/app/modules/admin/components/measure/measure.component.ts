import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit {
  @Input() jobId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
