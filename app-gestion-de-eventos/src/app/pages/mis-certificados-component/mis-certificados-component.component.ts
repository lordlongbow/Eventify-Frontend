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
import { jsPDF } from 'jspdf';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importar el servicio
import { MisCertificadosServiceService } from '../../services/mis-certificadosCervices/mis-certificados-service.service';
import { TokenService } from '../../services/tokenServices/token-service.service';

//api
import { API_BASE_URL, darFormatoAFecha } from '../../app.config';

@Component({
  selector: 'app-mis-certificados-component',
  standalone: true,
  imports: [ RouterLink, 
    RouterOutlet, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule, 
    MatCardModule],
  templateUrl: './mis-certificados-component.component.html',
  styleUrl: './mis-certificados-component.component.css'
})
export class MisCertificadosComponentComponent {

  certificados: any[] = []; 

  API_BASE_URL = API_BASE_URL; 

  cartificado: any = {
    idParticipacion: 0,
    nombre: '',
    username: '',
    eventoNombre: '',
    eventoFecha:'',
    eventoUbicacion: ''
  };

  darFormatoFecha(fecha: string): string {
    return darFormatoAFecha(fecha);
  }

  constructor(private tokenService: TokenService, private http: HttpClient, private misCertificadosServices: MisCertificadosServiceService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.misCertificadosServices.listarmisCertificados().subscribe((response) => {
      this.certificados = response.participaciones;
      console.log(this.certificados);
      this.cdr.detectChanges();
    });
  }

  generarCertificado(idParticipacion: number) {
    this.misCertificadosServices.descargarCertificado(idParticipacion).subscribe(
      (data) => {
        this.cartificado = data.participaciones[0];
        console.log(this.cartificado); // Verifica los datos nuevamente
  
        const doc = new jsPDF();
  
        // Fondo del diploma
        doc.setFillColor(240, 240, 240); // Gris claro
        doc.rect(10, 10, 190, 277, 'F'); // Dibujar un rectángulo con fondo
  
        // Título del certificado
        doc.setFont('times', 'bold');
        doc.setFontSize(24);
        doc.text('Certificado de Asistencia', 105, 50, { align: 'center' });
  
        // Línea decorativa
        doc.setDrawColor(0, 0, 0); // Negro
        doc.line(50, 60, 160, 60); // Línea horizontal
  
        // Subtítulo
        doc.setFont('times', 'normal');
        doc.setFontSize(14);
        doc.text(
          'En reconocimiento a su participación en el siguiente evento:',
          105,
          70,
          { align: 'center' }
        );
  
        // Datos del participante
        doc.setFontSize(16);
        doc.setFont('times', 'bold');
        doc.text(`Certificamos que: ${this.cartificado.nombreAsistente}`, 105, 90, { align: 'center' });
        doc.setFont('times', 'italic');
        doc.text(` mejor conocido como : ${this.cartificado.username}`, 105, 100, { align: 'center' });
  
        // Detalles del evento
        doc.setFont('times', 'normal');
        doc.text(`ha participado del evento: ${this.cartificado.nombreEvento}`, 105, 120, { align: 'center' });
        doc.text(`En : ${this.cartificado.ubicacion}`, 105, 140, { align: 'center' });
  
      
        console.log(this.cartificado.ubicacion); // Verifica si ahora imprime correctamente
  
        // Convertir el PDF a blob y abrirlo en una nueva ventana
        const pdfBlob = doc.output('blob');
        const pdfURL = URL.createObjectURL(pdfBlob);
        window.open(pdfURL, '_blank');
      },
      (error) => {
        console.error('Error al descargar los datos del certificado', error);
      }
    );
  }
  
  
  

}
/*doc.text(
        `Fecha: ${this.darFormatoAFecha(this.cartificado.eventoFecha.toString())}`,
        105,
        130,
        { align: 'center' }
      )*/