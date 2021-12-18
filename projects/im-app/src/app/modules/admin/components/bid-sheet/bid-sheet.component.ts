import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bid-sheet',
  templateUrl: './bid-sheet.component.html',
  styleUrls: ['./bid-sheet.component.scss']
})
export class BidSheetComponent implements OnInit {
  @Input() jobId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
