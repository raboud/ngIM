import { Component, OnInit } from '@angular/core';
import { AlertService, BusyService } from 'randr-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'im-app';
  toggle = false;
  authenticated = false;
  product = 'Test'

  constructor(private alert: AlertService, private busy: BusyService) {
  } 

  ngOnInit() {
  }

}
