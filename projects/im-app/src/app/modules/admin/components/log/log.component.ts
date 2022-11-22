import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BidSheetService } from '../../services/bid-sheet.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})

export class LogComponent {
  id?: number;


  constructor(private dataService: BidSheetService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


}


