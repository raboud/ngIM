import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AlertService, BusyService, Page, PageRequest } from 'randr-lib';

import { environment } from 'projects/im-app/src/environments/environment';
import { Measure, MeasureCreate, MeasureEdit, MeasureList } from '../models/measure.model';
import { User } from '../models/user.model';


export interface UserListQuery {
  role?: string;
  active?: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertService,
    private busyService: BusyService,
  ) { }

  getList(
    //request: PageRequest<MeasureList>,
    query: UserListQuery
  ): Observable<User[]> {
    console.log(query);

    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'user';

    //`${href}?filter=${filter}&sortColumn=${sort}&sortDirection=${order}&pageSize=${request.size}&page=${request.page + 1}`;

    let requestUrl = href;
    let params = "";

    if (query?.role && query?.role != '') {
      params += `role=${query.role}`;
    }

    if (query?.active) {
      if (params != "") {
        params += "&";
      }
      params += `active=${query.active}`;
    }

    if (params != ""){
      requestUrl += `?${params}`;
    }

    return this._httpClient.get<User[]>(requestUrl).pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );
  }


  get(id: number): Observable<User> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'user';
    let requestUrl = `${href}/${id}`;

    return this._httpClient.get<User>(requestUrl)
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => this.busyService.RemoveBusy())
      );

  }

  put(id: number, item: MeasureEdit): Observable<MeasureEdit> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'user';
    let requestUrl = `${href}/${id}`;

    return this._httpClient.put<Measure>(requestUrl, item, httpOptions)
    .pipe(
      catchError(err => this.handleError(err)),
      finalize(() => this.busyService.RemoveBusy())
    );

  }

  sync(): Observable<any> {
    this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'user/sync';

    return this._httpClient.get(href)
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
