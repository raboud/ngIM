import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginatedDataSource, Sort } from 'randr-lib';
import { JobList } from '../../../../shared/models/job-list.model';
import { JobListQuery, JobService } from '../../../../shared/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  psort: Sort<JobList> = {property: 'address1', order: '' };

  dataSource: PaginatedDataSource<JobList, JobListQuery>
    = new PaginatedDataSource<JobList, JobListQuery>(
      (request, query) => this.dataService.getPage(request, query),
      this.psort,
      {lastname: ''});
  displayedColumns: string[] = ['name', 'line1', 'city', 'state', 'zip', 'status', 'date', 'ourTotal'];

  resultsLength = 0;
  pageSize = 20;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private dataService: JobService) { }

  select(id: number){
    console.log(id);
  }
}


