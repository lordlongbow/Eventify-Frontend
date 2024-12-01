import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null = null;

  constructor() {}

  // Método para establecer el token
  setToken(token: string): void {
    this.token = token;
  }

  // Método para obtener el token
  getToken(): string | null {
    
    return this.token;
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.token !== null;
  }

  // Método para cerrar sesión
  logout(): void {
    this.token = null;
  }

  //Metodo para obtener el id del usuario logueado
  getId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        console.log('Token obtenido:', token);
        const decoded: any = jwtDecode(token);
        console.log('Decodificado:', decoded);
        console.log(decoded.id);
        
        return decoded.id || null; 
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
}