import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../tokenServices/token-service.service';  
@Injectable({
  providedIn: 'root'
})
export class HomeServicesService {


  private apiBaseUrl = 'http://localhost:3000/eventos';  
  
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listarEventos(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/todos`, {withCredentials: true});
  }
}
