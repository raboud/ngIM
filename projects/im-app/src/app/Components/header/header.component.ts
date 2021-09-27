import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isActive = true;
  public authenticated = false;
  badge = 0;

  isIframe = false;

  @Input() product: string;
  
  constructor(
    private router: Router,
    private authService: MsalService,
    ) { 
    }

    ngOnInit() {
    }
  
    menu() {
      this.isActive = !this.isActive;
    }

}
