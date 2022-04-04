import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'msal-lib';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();
  isDark = this.styleManager.isDarkMode();
  public isActive = true;
  public authenticated = false;
  badge = 0;

  isIframe = false;

  @Input() product!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private styleManager: ThemeService
    ) {
    }

    ngOnInit() {
      this.styleManager.initTheme();
      this.isDark = this.styleManager.isDarkMode();
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

    toggleDarkTheme() {
      if (this.isDark)
      {
        console.log("light mode")
        this.styleManager.setLightMode();
      }
      else{
        console.log('Dark Mode')
        this.styleManager.setDarkMode();
      }
//      this.styleManager.toggleDarkTheme();
//      this.isDark = !this.isDark;
    }
}
