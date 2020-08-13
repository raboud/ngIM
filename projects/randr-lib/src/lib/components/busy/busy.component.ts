import { Component, OnInit } from '@angular/core';
import { BusyService } from '../../services/busy.service';

@Component({
  selector: 'lib-randr-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {
  mode: string;
  value = 100;

  constructor(private busy: BusyService) { }

  ngOnInit(): void {
    this.busy.Busy.subscribe((value) => {
      this.mode = value ? 'indeterminate' : 'determinate';
    });
  }
}
