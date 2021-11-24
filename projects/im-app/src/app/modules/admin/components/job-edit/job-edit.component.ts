import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobEdit } from '../../models/job-edit.module';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<JobEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobEdit,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
