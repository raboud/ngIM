import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GithubApi, Page, Customer } from '../Models';
import { AlertService } from 'randr-lib';
import { BusyService } from 'randr-lib';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private _httpClient: HttpClient, 
    private alertService: AlertService,
    private busyService: BusyService,
  ) { }

  getRepoIssues(sort: string, order: string, page: number, pageSize: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/components&sort=${sort}&order=${order}&per_page=${pageSize}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl)     
    .pipe(
      catchError(err => this.handleError(err))
    );
  }

  
  getCustomer(sort: string, order: string, page: number, pageSize: number): Observable<Page<Customer>> {
    this.busyService.AddBusy();
    const href = environment.apiUrl + '/api/customer';
    const requestUrl =
      `${href}?sortColumn=${sort}&sortDirection=${order}&pageSize=${pageSize}&page=${page + 1}`;

    return this._httpClient.get<Page<Customer>>(requestUrl)      
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
  }
}