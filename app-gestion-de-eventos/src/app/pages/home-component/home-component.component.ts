import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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
import { API_BASE_URL, darFormatoAFecha } from '../../app.config';

import { HomeServicesService } from '../../services/home-services/home-services.service';
import { response } from 'express';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [  RouterLink, 
    RouterOutlet, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule, 
    MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit {

  API_BASE_URL = API_BASE_URL;

  darformatoFecha(fecha: string): string {
    return darFormatoAFecha(fecha);
  }

    eventos: any[] = [];  // Aquí se guardarán los eventos obtenidos
  
    constructor(private HomeServicesService: HomeServicesService, private cdr: ChangeDetectorRef) {}
    ngOnInit() {
      this.HomeServicesService.listarEventos().subscribe(
        (response: any) => {
   
      
          this.eventos = response['eventos'][0]; 
          
          console.log('Eventos extraídos:', this.eventos);
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error al obtener eventos:', error);
        }
      );
    }
    
  
}
  