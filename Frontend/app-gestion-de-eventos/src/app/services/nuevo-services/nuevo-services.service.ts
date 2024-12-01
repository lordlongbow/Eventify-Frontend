import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NuevoServicesService {
  private apiBaseUIrl = 'http://localhost:3000/eventos';
  constructor(private http: HttpClient) { }

  nuevo(data: any): Observable<any> {
    return this.http.post(`${this.apiBaseUIrl}/cargar`, data, { withCredentials: true });
  }

}
