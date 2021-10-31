import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobDetail } from '../../models/jog-detail.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  item: JobDetail;
  id: number;

  constructor(private service: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id; // (+) converts string 'id' to a number
      this.getItem();
    });
  }
  
  getItem() {
    this.service.getDetail(this.id).subscribe( item => {
        this.item = item;
        console.log(this.item);
      }
    );
  }


}
