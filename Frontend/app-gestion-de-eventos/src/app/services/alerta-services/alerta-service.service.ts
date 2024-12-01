import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

//Las alertas fueron creadas usando SweetAlert en este servicio se agrupan en un objeto y se exportan para que se puedan utilizar en otros componentes

  // Alerta de éxito
  mostrarExito(titulo: string, mensaje: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    });
  }

  // Alerta de error
  mostrarError(titulo: string, mensaje: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Intentar nuevamente',
      confirmButtonColor: '#d33',
    });
  }

  // Alerta de advertencia
  mostrarAdvertencia(titulo: string, mensaje: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#f0ad4e',
    });
  }

  // Alerta de información
  mostrarInformacion(titulo: string, mensaje: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#5bc0de',
    });
  }

  // Alerta de confirmación (Sí/No)
  mostrarConfirmacion(titulo: string, mensaje: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }
}
