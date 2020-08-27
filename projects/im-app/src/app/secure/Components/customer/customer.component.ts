import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Customer } from '../../Models';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'city', 'state', 'zip'];

  data: Customer[] = [];

  resultsLength = 0;
  pageSize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private exampleDatabase: CustomerService) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.exampleDatabase!.getCustomer(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.resultsLength = data.rowCount;

          return data.results;
        }),
        catchError(() => {
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}