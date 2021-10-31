import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedDataSource } from 'projects/im-app/src/app/models/paginated.datasource';
import { JobList } from '../../models/job-list.model';
import { JobListQuery, JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  dataSource: PaginatedDataSource<JobList, JobListQuery> 
    = new PaginatedDataSource<JobList, JobListQuery>( 
      (request, query) => this.exampleDatabase.getPage(request, query),
      null, 
      {lastname: ''});
  displayedColumns: string[] = ['name', 'line1', 'city', 'state', 'zip', 'status', 'date'];

  resultsLength = 0;
  pageSize = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private exampleDatabase: JobService) { }

  select(id: number){
    console.log(id);
  }
}


