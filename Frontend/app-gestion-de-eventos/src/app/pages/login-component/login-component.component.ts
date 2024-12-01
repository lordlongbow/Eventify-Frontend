import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//services
import { LoginServicesService } from '../../services/login-services/login-services.service';
import { TokenService } from '../../services/tokenServices/token-service.service';
import { AlertaService } from '../../services/alerta-services/alerta-service.service';
@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [RouterOutlet,RouterLink, ReactiveFormsModule ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {

  AsistenteForm: FormGroup;
  token: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private alertaService: AlertaService,private loginService: LoginServicesService, private tokenService: TokenService) {
    this.AsistenteForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

}

login(): void {
  if (this.AsistenteForm.valid) {
    const formData = this.AsistenteForm.value;
    
    this.loginService.login(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.token = response.token;
          this.tokenService.setToken(response.token); 
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: (error) => {
       this.alertaService.mostrarError('Error de Servidor', 'No se pudo conectar con el servidor. Por favor, intente mas tarde.');
      }
    });
  }
}

// Método adicional para verificar si el usuario está logueado
isLoggedIn(): boolean {
  return this.tokenService.isLoggedIn();
}
}

