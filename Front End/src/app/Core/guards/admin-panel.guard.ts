import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login/login.service';
import {map} from 'rxjs/operators';
import {NavigationService} from '../services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelGuard implements CanActivate {
  constructor(private router: Router, private authService: LoginService,private navigation:NavigationService) {}
  roles:string[]
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.navigation.getUserRole().pipe(map(r=>{
     if(r.roles.find(role=>role=="MainAdmin") || r.roles.find(role=>role=="Admin")||r.roles.find(role=>role=="Moderator")){
      return true
    }
     else {
       this.router.navigate(['login'], {
         queryParams: { returnUrl: state.url },
       });
       return false;
     }
    }))
  }
}
