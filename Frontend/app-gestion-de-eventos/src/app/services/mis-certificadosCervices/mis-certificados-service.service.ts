import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../tokenServices/token-service.service';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class MisCertificadosServiceService 
{

  API_BASE_URL = API_BASE_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  listarmisCertificados(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);
    return this.http.get(`${this.API_BASE_URL}/participaciones/misParticipaciones`, { headers });
  }


  descargarCertificado(idParticipacion: number): Observable<any> {
    const url = `${this.API_BASE_URL}/participaciones/detallesParticipacion/${idParticipacion}`;
    return this.http.get<any>(url); 
  }
  

}
