import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertService, BusyService } from 'randr-lib';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'projects/im-app/src/environments/environment';
import { JobEdit } from '../models/job-edit.model';
import { Measure, MeasureEdit, MeasureList } from '../models/measure.model';
import { Page, PageRequest } from '../../../models';

export interface JobListQuery {
  lastname?: string;
  clientid?: number;
  status?: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class MeasureService {

  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertService,
    private busyService: BusyService,
  ) { }

  getPage(
    request: PageRequest<MeasureList>,
    query: JobListQuery
  ): Observable<Page<MeasureList>> {
    console.log(query);

    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'measure';
    let requestUrl = `${href}?pageSize=${request.size}&page=${
      request.page + 1
    }`;
    //`${href}?filter=${filter}&sortColumn=${sort}&sortDirection=${order}&pageSize=${request.size}&page=${request.page + 1}`;

    if (query?.lastname && query?.lastname != '') {
      requestUrl += `&filter=lastname=${query.lastname}`;
    }

    if (query?.clientid) {
      requestUrl += `&filter=clientid=${query.clientid}`;
    }

    if (query?.status) {
      requestUrl += `&filter=status=${query.status}`;
    }

    if (request.sort) {
      requestUrl += `&sortColumn=${request.sort.property}&sortDirection=${request.sort.order}`;
    }

    return this._httpClient.get<Page<MeasureList>>(requestUrl).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );
  }


  get(id: number): Observable<Measure> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'measure';
    let requestUrl = `${href}/${id}`;

    return this._httpClient.get<Measure>(requestUrl)
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => this.busyService.RemoveBusy())
      );

  }

  put(id: number, item: JobEdit): Observable<MeasureEdit> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'measure';
    let requestUrl = `${href}/${id}`;

    return this._httpClient.put<Measure>(requestUrl, item, httpOptions)
    .pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );

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
  }}
