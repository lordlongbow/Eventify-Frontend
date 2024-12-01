import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../app.config';
@Injectable({
  providedIn: 'root'
})
export class EditarServiceService {

  API_BASE_URL = API_BASE_URL;

  
  constructor( private http: HttpClient) { }

  //OBTENER EVENTO
  getEvento(id: number): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/eventos/${id}`);
  }

  //EDITAR
  uploadEvento(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}/eventos/modificar/${id}`, data);
  }


}
