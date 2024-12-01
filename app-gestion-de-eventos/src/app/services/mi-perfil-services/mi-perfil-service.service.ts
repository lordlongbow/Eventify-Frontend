import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
import { TokenService } from '../tokenServices/token-service.service';

@Injectable({
  providedIn: 'root',
})
export class MiPerfilServiceService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  miPerfil(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const id = this.tokenService.getId();
    return this.http.get(`${API_BASE_URL}/asistentes/miPerfil/${id}`, { headers });
  }
  
}
    