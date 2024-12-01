import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

//services
import { NuevoServicesService } from '../../services/nuevo-services/nuevo-services.service';
import { TokenService } from '../../services/tokenServices/token-service.service';
import { AlertaService } from '../../services/alerta-services/alerta-service.service';


@Component({
  selector: 'app-nuevo-component',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, ReactiveFormsModule ],
  templateUrl: './nuevo-component.component.html',
  styleUrl: './nuevo-component.component.css'
})
export class NuevoComponentComponent {

  //formulario del evento
  nuevoForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private alertaService: AlertaService, private nuevoService: NuevoServicesService,private router: Router, private tokenService: TokenService) {
    this.nuevoForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      ubicacion: ['', Validators.required],
      foto: [null, Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  //crear evento

nuevo() {
  if (this.nuevoForm.valid) {
    //Formulario de Nuveo
    const formData = new FormData();

    // Agregar los valores del formulario al FormData
    formData.append('nombre', this.nuevoForm.get('nombre')?.value);
    formData.append('fecha', this.nuevoForm.get('fecha')?.value);
    formData.append('ubicacion', this.nuevoForm.get('ubicacion')?.value);
    formData.append('descripcion', this.nuevoForm.get('descripcion')?.value);

    // Agregar la foto si es válida
    const fotoInput = this.nuevoForm.get('foto')?.value;
    if (fotoInput instanceof File) {
      formData.append('foto', fotoInput, fotoInput.name);
    } else {
      console.error('La foto no es un archivo válido:', fotoInput);
      alert('Error: La foto seleccionada no es válida.');
      return;
    }

    // Enviar datos al backend
    this.nuevoService.nuevo(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertaService.mostrarExito('¡Éxito!', 'Evento creado exitosamente').then(() => {
            this.router.navigate(['/mis-eventos']);
          })
         
        } else {
         this.alertaService.mostrarError('Error', 'Error al crear el evento');
        }
      },
      error: (error) => {
       this.alertaService.mostrarError('Error de Servidor', 'No se pudo conectar con el servidor. Por favor, intente más tarde.');
      }
    });
  } else {
   this.alertaService.mostrarError('Error', 'Formulario inválido');
  }
}

  //imagen por defecto
  previewImage: string = '/assets/img/logos/default-evento.jpg'; 

  
  //Hacer que la imagen sea el input
  

  onFileSelected(event: any): void {
    if (!event.target.files || event.target.files.length === 0) {
      console.error('No se seleccionó ningún archivo.');
      return;
    }
  
    const file = event.target.files[0];
    
    // Verificar si es un archivo válido de imagen
    if (!file.type.startsWith('image/')) {
      this.alertaService.mostrarAdvertencia('Advertencia', 'El archivo debe ser una imagen.');
      return;
    }
  
    // Actualizar la vista previas
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  
    // Asignar el archivo al control del formulario
    this.nuevoForm.patchValue({ foto: file });
    // Validar el campo después de actualizarlo
    this.nuevoForm.get('foto')?.updateValueAndValidity(); 
  }
  
}

