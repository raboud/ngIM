import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDetail } from '../../models/jog-detail.model';
import { JobService } from '../../services/job.service';
import { JobEditComponent } from '../job-edit/job-edit.component';

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  styleUrls: ['./job-header.component.scss']
})
export class JobHeaderComponent implements OnInit {
@Input() data?: JobDetail
constructor(
  public dialog: MatDialog,
  private service: JobService,

) {}

  ngOnInit(): void {
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(JobEditComponent, {
            width: '700px',
      data: JSON.parse(JSON.stringify(this.data))
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result != undefined)
      {
//        this.getItem();
      }
    });
  }
}
