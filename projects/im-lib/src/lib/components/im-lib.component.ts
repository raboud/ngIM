import { Component, OnInit } from '@angular/core';
import { ImLibService } from '../services/im-lib.service';


@Component({
  selector: 'lib-im-lib',
  template: `
    <p>
      im-lib works!
    </p>
  `,
  styles: [
  ]
})
export class ImLibComponent implements OnInit {

  constructor(private serv: ImLibService) { }

  ngOnInit(): void {
  } 

}
