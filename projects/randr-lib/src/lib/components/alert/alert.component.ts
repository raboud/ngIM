import { Component, OnInit } from '@angular/core';
import { AlertService, alertItem } from '../../services/alert.service';

@Component({
  selector: 'lib-randr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
  alerts: alertItem[] = [];

  constructor(
    private alerService: AlertService
    ) { }

  ngOnInit() {
    this.alerService.Alerts.subscribe((alert) => {
      this.alerts.push(alert);
      setTimeout(
        () => this.alerts.shift(),
        5000
      );
    });

  }

}
