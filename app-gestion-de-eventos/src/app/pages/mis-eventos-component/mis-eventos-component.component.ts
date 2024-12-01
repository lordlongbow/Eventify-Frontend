import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importar el servicio
import { MisEventosServicesService } from '../../services/mis-eventosServices/mis-eventos-services.service';
import { TokenService } from '../../services/tokenServices/token-service.service';

//api
import { API_BASE_URL, darFormatoAFecha } from '../../app.config';

@Component({
  selector: 'app-mis-eventos-component',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule, 
    MatCardModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mis-eventos-component.component.html',
  styleUrls: ['./mis-eventos-component.component.css']
})
export class MisEventosComponentComponent implements OnInit {

  eventos: any[] = []; 

  API_BASE_URL = API_BASE_URL; 

  darFormatoFecha(fecha: string): string {
    return darFormatoAFecha(fecha);
  }

  constructor(private tokenService: TokenService, private http: HttpClient, private misEventosServices: MisEventosServicesService, private cdr: ChangeDetectorRef, private router: Router) {}

ngOnInit() {
  this.misEventosServices.listarMisEventos().subscribe(
    (response) => {
      console.log("Eventos Recibidos" + response);
      this.eventos = response.eventos; 
      this.cdr.detectChanges();  
    },
    (error) => {
      console.error('Error al obtener eventos:', error);
    }
  );
}

eliminar(id: number) {
  this.misEventosServices.eliminar(id).subscribe(
    (response) => {
      if (response.success) {
        alert('Evento eliminado exitosamente');
        this.router.navigate(['/mis-eventos']);
      } else {
        alert('Error al eliminar el evento');
      }
    },
    (error) => {
      console.error('Error al eliminar el evento:', error);
    }
  );

 
}}
