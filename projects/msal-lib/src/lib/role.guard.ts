import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

import { AlertService } from 'randr-lib';

import { AuthService } from "./auth.service"

interface Account extends AccountInfo {
  idTokenClaims?: {
    roles?: string[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private alertService: AlertService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data.expectedRole;

    return this.authService.inRole(expectedRole);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = childRoute.data.expectedRole;

    return this.authService.inRole(expectedRole);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data.expectedRole;

    return this.authService.inRole(expectedRole);
  }
}
