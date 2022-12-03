import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from '../../models/log.model';

import { BidSheetService } from '../../services/bid-sheet.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})

export class LogComponent implements OnInit, OnChanges {
  @Input() bidId?: number;
  data?: any;

  displayedColumns: string[] = ['id', 'message', 'logLevel'];

  constructor(private dataService: BidSheetService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getItem();
  }

  getItem() {
    if (this.bidId) {
      this.dataService.getLogs(this.bidId).subscribe((item) => {
        this.data = item;
        console.log(this.data);
      });
    }
  }

}


