import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from '../services/tokenServices/token-service.service';
@Injectable({
  providedIn: 'root'
})
//El interceptor va a Interceptar todas la peticiones y enviara el token al backend
export class InterceptorTokenService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //se recupera el token   
  const token = this.tokenService.getToken();
    //si hay token clona el request y le agrega el token
  if(token){
    const requerimientoClonado = req.clone({
      setHeaders:{Autorization: `Bearer ${token}`},
    });
    return next.handle(requerimientoClonado);
  } 
  return next.handle(req);
  }
}
