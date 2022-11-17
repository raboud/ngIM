import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ThrottlingUtils } from '@azure/msal-common';
import { PaginatedDataSource, Sort } from 'randr-lib';
import { JobList } from '../../../../shared/models/job-list.model';
import { List } from '../../../../shared/models/list.model';
import { JobListQuery, JobService } from '../../../../shared/services/job.service';
import { ListService } from '../../../../shared/services/list.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  psort: Sort<JobList> = {property: 'address1', order: '' };

  statuses: List[]= [];

  dataSource: PaginatedDataSource<JobList, JobListQuery>
    = new PaginatedDataSource<JobList, JobListQuery>(
      (request, query) => this.dataService.getPage(request, query),
      this.psort,
      {lastname: ''});
  displayedColumns: string[] = ['name', 'line1', 'city', 'state', 'zip', 'status', 'date', 'ourTotal'];

  resultsLength = 0;
  pageSize = 20;
  id?: number;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private dataService: JobService, private listService: ListService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listService.getJobStatuses().subscribe((stats) =>
    {
      this.statuses = stats;
     });
    this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      if (this.id)
      {
        this.dataSource.queryBy({clientid: this.id});
      }
    });
  }

  select(id: number){
    console.log(id);
  }



  processing: boolean = false;
  progress: number = 0;
  message: string | undefined;

  onDragOver(event: any) {
    console.log("onDragOver " + event)
    event.preventDefault();
  }

  onDropSuccess(event: any) {
    console.log("onDropSuccess " + event)
    event.preventDefault();

    this.onFileChange(event.dataTransfer.files);
  }

  onChange(event:any ) {
    console.log("onChange " + event)
    this.onFileChange(event.target.files);
  }

  onStatusChange(jobId:number, status: number) {
    this.dataService.updateStatus(jobId, status).subscribe();
    console.log('status ' + status + ' - JobId ' + jobId);
  }

  private onFileChange(files: any) {
    console.log("onFileChange " + files)
    this.progress = 0;
    this.message = undefined;

    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:5001/api/bid/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded /(event.total ?? 0));
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.progress = 0;
//          this.onUploadFinished.emit(event.body);
        }
      });
  }
}


