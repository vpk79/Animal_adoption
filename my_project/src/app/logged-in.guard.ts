import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class loggedInGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private authService: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const getUserInfo = this.localStorageService.getItem('userInfo');
    if (getUserInfo && getUserInfo.logged) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}