import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @Input() jobId: number = 0;
  id: number = 0;

  constructor(    private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(this.jobId);
      this.jobId = +params['id']; // (+) converts string 'id' to a number
      console.log(params);
    });
  }

}
