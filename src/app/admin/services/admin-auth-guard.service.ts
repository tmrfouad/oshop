import { AuthService } from '../../shared/services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.currentUser$
      .map(appUser => appUser.isAdmin);
  }
}
