import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiBaseUrl = 'http://localhost:3000/asistentes'; 

  constructor(private http: HttpClient) {}

  registro(data: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/registro`, data);
  }
}
