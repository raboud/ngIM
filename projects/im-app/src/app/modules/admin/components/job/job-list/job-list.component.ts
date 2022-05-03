import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThrottlingUtils } from '@azure/msal-common';
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

  constructor(private dataService: JobService, private http: HttpClient) { }

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


