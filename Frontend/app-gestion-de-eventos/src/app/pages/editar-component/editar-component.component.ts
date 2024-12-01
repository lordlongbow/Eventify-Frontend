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
import Swal from 'sweetalert2';


import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
//Servicios
import { EditarServiceService } from '../../services/editar-services/editar-service.service';
import { AlertaService } from '../../services/alerta-services/alerta-service.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-editar-component',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, MatIconModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './editar-component.component.html',
  styleUrl: './editar-component.component.css'
})
export class EditarComponentComponent {
//Variables
  editarForm : FormGroup;
  idEveneto!: number | null;
//Constructor, se inicia el FormGroup
constructor(  private fb: FormBuilder,
  private editarService: EditarServiceService,
  private alertaService: AlertaService,
  private router: Router,
  private route: ActivatedRoute) {

  this.editarForm = this.fb.group({
    nombre: ['', Validators.required],
    fecha: ['', Validators.required],
    ubicacion: ['', Validators.required],
    descripcion: ['', Validators.required],
  });
 }

 ngOnInit() {
  //Se recupera el id de la ruta y se lo parcea a un entero

  this.idEveneto = +this.route.snapshot.paramMap.get('id')!;
  if(this.idEveneto){
    this.cargarDatos(this.idEveneto);
  }
}


cargarDatos( id: number){
  this.editarService.getEvento(id).subscribe(
    (response) => {

      //convertimos la fecha en un formato valido para el input
      const fecha = new Date(response[0].fecha).toISOString().split('T')[0];
      

      this.editarForm.patchValue({
        nombre: response[0].nombre,
        fecha: fecha,
        ubicacion: response[0].ubicacion,
        descripcion: response[0].descripcion
      });
    },
    (error) => {
      console.error('Error al obtener detalles del evento:', error);
    }
  );
}

  editar() {
    if (this.editarForm.valid) {
      //Usando el servicio de Editar Evento
      this.editarService.uploadEvento(this.idEveneto!, this.editarForm.value).subscribe(
        (response) => {
          if (response.success) {
            // Usando el servicio para mostrar una alerta de éxito
            this.alertaService.mostrarExito('¡Éxito!', 'Evento editado exitosamente')
              .then(() => {
                this.router.navigate(['/mis-eventos']);
              });
          } else {
            // Usando el servicio para mostrar una alerta de error
            this.alertaService.mostrarError('Error', 'Error al editar el evento');
          }
        },
        (error) => {
          console.error('Error al editar el evento:', error);
          // Usando el servicio para mostrar una alerta de error
          this.alertaService.mostrarError('Error de Servidor', 'No se pudo conectar con el servidor. Por favor, intente más tarde.');
        }
      );
    }
  }
  
  
}
