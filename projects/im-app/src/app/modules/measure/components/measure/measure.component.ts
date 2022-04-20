import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit {
  id: number = 0;

  constructor(    private route: ActivatedRoute) {
    console.log('MeasureComponent');
   }

  ngOnInit(): void {
    console.log('MeasureComponent-OnInit');

    this.route.params.subscribe((params) => {
      this.id = +params['JobId']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
  }

}
