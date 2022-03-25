import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit {
  @Input() jobId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
