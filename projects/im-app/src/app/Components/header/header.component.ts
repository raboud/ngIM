import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'msal-lib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();

  public isActive = true;
  public authenticated = false;
  badge = 0;

  isIframe = false;

  @Input() product!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    ) {
    }

    ngOnInit() {
      this.authService.Authenticated$
      .pipe(
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        console.log(result);
        this.authenticated = result;
      });
    }

    menu() {
      this.isActive = !this.isActive;
    }

    isAdmin() : boolean {
      return this.authService.inRole('Admin')
    }

}
