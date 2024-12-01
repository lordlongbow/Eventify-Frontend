import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//services
import { RegistroService } from '../../services/registro-services/registro-service.service';
import { AlertaService } from '../../services/alerta-services/alerta-service.service';

@Component({
  selector: 'app-registro-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './registro-component.component.html',
  styleUrl: './registro-component.component.css'
})
export class RegistroComponentComponent {
  //Variable
  AsistenteForm : FormGroup;

  //Se inicializa en el contructor
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,private alertaService: AlertaService, private registroService: RegistroService) {
    this.AsistenteForm = this.fb.group({
      nombre: ['', Validators.required],
      domicilio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      estado: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


  onSubmit():void {
    if(this.AsistenteForm.valid){
      const formData = this.AsistenteForm.value;

      this.registroService.registro(formData).subscribe({
        next: (response: any) => {
          if (response.success) {
           this.alertaService.mostrarExito('¡Éxito!', 'Usuario registrado exitosamente').then(() => {
            this.router.navigate(['/login']);
           })
            
          } else {
          this.alertaService.mostrarError('Error', 'Error al registrar el usuario');
          }
        },
        error: (error) => {
          console.error('Error en el registro', error);
         this.alertaService.mostrarError('Error de Servidor', 'No se pudo conectar con el servidor. Por favor, intente mas tarde.');
        }
      });

    }
  }
}
