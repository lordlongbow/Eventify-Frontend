import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import { TokenService } from '../services/tokenServices/token-service.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private TokenService: TokenService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    //Si esta logueado permitira el acceso al sistema
    if (this.TokenService.isLoggedIn()) {
      return true; 
    } else {
      //Sino redirige a la vista de login
      return this.router.createUrlTree(['/login']); 
    }
  }
  
  
}    