import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AlertService, BusyService } from 'randr-lib';

import { environment } from 'projects/im-app/src/environments/environment';
import { BidSheet } from '../models/bidsheet.model';
import { Log } from '../models/log.model';
import { Summary } from '../models/summary.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class BidSheetService {

  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertService,
    private busyService: BusyService,

  ) { }

  get(id: number): Observable<BidSheet> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'bid';
    let requestUrl = `${href}/${id}`;

    return this._httpClient.get<BidSheet>(requestUrl)
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => this.busyService.RemoveBusy())
      );

  }

  getSummary(id: number): Observable<Summary> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'bid';
    let requestUrl = `${href}/${id}/summary`;

    return this._httpClient.get<Summary>(requestUrl)
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => this.busyService.RemoveBusy())
      );

  }

  getLogs(id: number): Observable<Log[]> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'bid';
    let requestUrl = `${href}/${id}/logs`;

    return this._httpClient.get<Log[]>(requestUrl)
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => this.busyService.RemoveBusy())
      );

  }

  put(id: number, item: BidSheet): Observable<BidSheet> {
    console.log(item);
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'bid';
    let requestUrl = `${href}/${id}`;

    console.log("about to http client put");
    return this._httpClient.put<BidSheet>(requestUrl, item, httpOptions)
    .pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );
    console.log("http client put complete");
  }

  private handleError(error: HttpErrorResponse) {
    //    this.busyService.RemoveBusy();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.alertService.AddErrorMessage(`An error occurred:, ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.alertService.AddErrorMessage(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
