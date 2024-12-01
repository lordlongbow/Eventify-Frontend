import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../tokenServices/token-service.service';
@Injectable({
  providedIn: 'root'
})
export class MisEventosServicesService {

  
  private apiBaseUrl = 'http://localhost:3000/eventos';  
  
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listarMisEventos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);
    return this.http.get(`${this.apiBaseUrl}/misEventos`, { headers });
  }
    
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/borrar/${id}`, {withCredentials: true});
  }
}
 