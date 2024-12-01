import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  private apiBaseUIrl = 'http://localhost:3000/asistentes';
  constructor(private http: HttpClient) { }

  

  login(data:any): Observable<any>{
    return this.http.post(`${this.apiBaseUIrl}/login`, data, { withCredentials: true });
  }


}
