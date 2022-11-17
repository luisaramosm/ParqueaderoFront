import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {

  constructor(private LoginService: LoginService, private router: Router){

  }

  redirect(LoginService: false): any {
    if(!LoginService){
      this.router.navigate(['login/', 'xxxxx'])
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;
    console.log(ActivatedRouteSnapshot);
  }
  
}
