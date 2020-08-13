import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertLevel } from './alert-level.enum';

export interface alertItem {
  type: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public Alerts = new Subject<alertItem>();

  constructor() { }

  AddMesage(message: string, level: AlertLevel) {
    let type: string;

    switch (level) {
      case AlertLevel.SUCCESS:
        type = "success";
        break;
      case AlertLevel.INFO:
        type = "info";
        break;
      case AlertLevel.WARN:
        type = "warning";
        break;
      case AlertLevel.ERROR:
        type = "danger";
        break;
      case AlertLevel.DEBUG:
        type = "primary";
        break;
    }
    let alert: alertItem = {type: type, message: `${new Date()} - ${message}`}

    this.Alerts.next(alert);
  }

  AddSuccessMessage(message: string) {
    this.AddMesage(message, AlertLevel.SUCCESS);
  }
  AddInfoMessage(message: string) {
    this.AddMesage(message, AlertLevel.INFO);
  }
  AddWarningMessage(message: string) {
    this.AddMesage(message, AlertLevel.WARN);
  }
  AddErrorMessage(message: string) {
    this.AddMesage(message, AlertLevel.ERROR);
  }
  AddDebugMessage(message: string) {
    this.AddMesage(message, AlertLevel.DEBUG);
  }
}
