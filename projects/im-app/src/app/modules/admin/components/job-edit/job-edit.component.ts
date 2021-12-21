import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobEdit, Address } from '../../models/job-edit.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<JobEditComponent>,
    private service: JobService,
    @Inject(MAT_DIALOG_DATA) public data: JobEdit,
  ) {

   }

  ngOnInit(): void {
  }

  onClick(): void {
    this.service.put(this.data.id, this.data).subscribe(item => {
      this.dialogRef.close(this.data);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
