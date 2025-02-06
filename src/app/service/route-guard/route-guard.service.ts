import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../../../../docs/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private hardCodedAutheticationService:AuthService,
  private route:Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.hardCodedAutheticationService.isuserLoggedIn())
      return true;
  
   return this.route.navigate(["login"]);
  }
}
