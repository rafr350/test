import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authService.isAdmin() // trả về 1 Promise
      .then((authenticated: boolean) => {
        if (authenticated) {
          return true; // cho phép sử dụng route
        } else {
          this.router.navigate(['/']); // điều hướng về route gốc
          return false; // không cho phép sử dụng route
        }
      });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }
}
