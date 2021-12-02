import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
  @Input() title: string;
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
