import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, finalize } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Client } from '../Models';
import { AlertService } from 'randr-lib';
import { BusyService } from 'randr-lib';
import { Page, PageRequest } from '../../../../../../randr-lib/src/lib/models';


export interface ClientQuery {
  lastname: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertService,
    private busyService: BusyService,
  ) { }

  clientPage(request: PageRequest<Client>, query: ClientQuery): Observable<Page<Client>> {
      this.busyService.AddBusy();
    const href = environment.msalConfig.resources.imApi.endpoint + 'client';
    let requestUrl = `${href}?pageSize=${request.size}&page=${request.page + 1}`;
    //`${href}?filter=${filter}&sortColumn=${sort}&sortDirection=${order}&pageSize=${request.size}&page=${request.page + 1}`;

    if (query?.lastname) {
      requestUrl += `&filter=lastname=${query.lastname}`;
    }

    if (request.sort) {
      requestUrl += `&sortColumn=${request.sort.property}&sortDirection=${request.sort.order}`;
    }

    return this._httpClient.get<Page<Client>>(requestUrl)
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
