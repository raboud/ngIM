import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JobDetail } from '../../../../shared/models/jog-detail.model';
import { JobService } from '../../../../shared/services/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  data?: JobDetail;
  id: number = 0;

  constructor(
    public dialog: MatDialog,
    private service: JobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getItem();
    });
  }

  getItem() {
    this.service.getDetail(this.id).subscribe((item) => {
      this.data = item;
    });
  }
}
