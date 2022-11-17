import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AlertService, BusyService, Page, PageRequest } from 'randr-lib';

import { environment } from 'projects/im-app/src/environments/environment';
import { JobList } from '../models/job-list.model';
import { BidSheetList, JobDetail } from '../../shared/models/jog-detail.model';
import { JobEdit } from '../models/job-edit.model';

export interface JobListQuery {
  lastname?: string;
  clientid?: number;
  status?: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertService,
    private busyService: BusyService
  ) {}

  getPage(
    request: PageRequest<JobList>,
    query: JobListQuery
  ): Observable<Page<JobList>> {
    console.log(query);

    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'job';
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

    return this._httpClient.get<Page<JobList>>(requestUrl).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );
  }

  getDetail(id: number): Observable<JobDetail> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'job';
    let requestUrl = `${href}/${id}`;

    return this._httpClient.get<JobDetail>(requestUrl).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );
  }

  getBidList(id: number): Observable<BidSheetList[]> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'job';
    let requestUrl = `${href}/${id}/bids`;

    return this._httpClient.get<BidSheetList[]>(requestUrl).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );

  }

  put(id: number, item: JobEdit): Observable<JobEdit> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'job';
    let requestUrl = `${href}/${id}`;

    return this._httpClient.put<JobDetail>(requestUrl, item, httpOptions).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );
  }

  updateStatus(id: number, status: number): Observable<boolean> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'job';
    let requestUrl = `${href}/${id}/status`;

    return this._httpClient.put<boolean>(requestUrl, status, httpOptions).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );

  }

  private handleError(error: HttpErrorResponse) {
    //    this.busyService.RemoveBusy();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.alertService.AddErrorMessage(
        `An error occurred:, ${error.error.message}`
      );
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.alertService.AddErrorMessage(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
