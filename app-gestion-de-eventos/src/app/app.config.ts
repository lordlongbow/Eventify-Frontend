import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormControl } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';


import { InterceptorTokenService } from './interceptors/interceptor-token.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), 
    provideHttpClient(withInterceptorsFromDi()),
    FormControl
  ]
};

export const API_BASE_URL = 'http://localhost:3000';

export function darFormatoAFecha(fecha: string): string {
  if (!fecha) {
    console.error('La fecha proporcionada está vacía o es nula.');
    return 'Fecha no válida';
  }

  // Normalizar el formato ISO si es necesario
  const fechaNormalizada = fecha.includes('T') ? fecha : `${fecha}T00:00:00Z`;

  const fechaObj = new Date(fechaNormalizada);

  if (isNaN(fechaObj.getTime())) {
    console.error(`Fecha inválida: ${fecha}`);
    return 'Fecha no válida';
  }

  // Formatear en DD/MM/YYYY
  return `${fechaObj.getDate().toString().padStart(2, '0')}/${(fechaObj.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${fechaObj.getFullYear()}`;
}
