import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../tokenServices/token-service.service'; 
import { API_BASE_URL } from '../../app.config'; 

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private API_BASE_URL = API_BASE_URL; // URL base del backend

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Obtener detalle de un evento
  detalle(eventoId: number): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/eventos/${eventoId}`);
  }

  // Obtener lista de asistentes de un evento
  obtenerAsistentes(eventoId: number): Observable<any> {
   
    return this.http.get(`${this.API_BASE_URL}/participaciones/listarAsistentesConfirmados/${eventoId}`);
  }

  // Actualizar lista de asistencia de un evento
  actualizarAsistencia(eventoId: number, asistenteId : number): Observable<any> {
    const idUsuarioLogueado = this.tokenService.getId(); 
    const body = {
      eventoId,
      asistenteId,
      idUsuarioLogueado
    }
    return this.http.put(`${this.API_BASE_URL}/participaciones/confirmarAsistencia/${eventoId}`, {body});
  }

  // Participar en un evento
  participar(eventoId: number, asistenteId: number): Observable<any> {
    const body = {
      eventoId,
      asistenteId
    };
    return this.http.post(`${this.API_BASE_URL}/participaciones/participar`, {body });
  }
}
