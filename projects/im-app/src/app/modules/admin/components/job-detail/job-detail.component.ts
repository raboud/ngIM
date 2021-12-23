import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JobDetail } from '../../models/jog-detail.model';
import { JobService } from '../../services/job.service';
import { JobEditComponent } from '../job-edit/job-edit.component';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  data: JobDetail;
  id: number;

  constructor(
    public dialog: MatDialog,
    private service: JobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params.id; // (+) converts string 'id' to a number
      this.getItem();
    });
  }

  getItem() {
    this.service.getDetail(this.id).subscribe((item) => {
      this.data = item;
      console.log(this.data);
    });
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
        this.getItem();
      }
    });
  }
}
