import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { BusyService } from '../../services/busy.service';

@Component({
  selector: 'lib-randr-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {
  mode: ProgressBarMode = 'determinate';
  value = 100;

  constructor(private busy: BusyService) { }

  ngOnInit(): void {
    this.busy.Busy.subscribe((value) => {
      this.mode = value ? 'indeterminate' : 'determinate';
    });
  }
}
