import { Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedDataSource, Sort } from 'randr-lib';

import { Client } from '../../Models';
import { ClientQuery, ClientService } from '../../Services/client.service';


@Component({
  selector: 'app-customer',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
//  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent {
  psort: Sort<Client> = { property: 'name', order: ''}

  dataSource: PaginatedDataSource<Client, ClientQuery>
    = new PaginatedDataSource<Client, ClientQuery>(
      (request, query) => this.exampleDatabase.clientPage(request, query),
      this.psort,
      {lastname: ''});
  displayedColumns: string[] = ['name'];

  resultsLength = 0;
  pageSize = 20;


  select(id: number){
    console.log(id);
  }



  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exampleDatabase: ClientService) { }
}
