import { Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedDataSource, Sort } from 'randr-lib';

import { Customer } from '../../Models';
import { CustomerQuery, CustomerService } from '../../Services/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
//  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent {
  psort: Sort<Customer> = { property: 'name', order: ''}

  dataSource: PaginatedDataSource<Customer, CustomerQuery>
    = new PaginatedDataSource<Customer, CustomerQuery>(
      (request, query) => this.exampleDatabase.customerPage(request, query),
      this.psort,
      {lastname: ''});
  displayedColumns: string[] = ['name', 'city', 'state', 'zip'];

  resultsLength = 0;
  pageSize = 20;


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exampleDatabase: CustomerService) { }
}
