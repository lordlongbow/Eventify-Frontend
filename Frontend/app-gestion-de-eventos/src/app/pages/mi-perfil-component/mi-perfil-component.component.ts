import { Component, OnInit } from '@angular/core';
import { MiPerfilServiceService } from '../../services/mi-perfil-services/mi-perfil-service.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/tokenServices/token-service.service';

@Component({
  selector: 'app-mi-perfil-component',
  standalone: true,
  imports: [],
  templateUrl: './mi-perfil-component.component.html',
  styleUrl: './mi-perfil-component.component.css'
})
export class MiPerfilComponentComponent implements OnInit {
  perfil: any = {};

  constructor(
    private miPerfilService: MiPerfilServiceService, 
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
  
    this.miPerfilService.miPerfil().subscribe({
      next: (data) => {
        this.perfil = data[0];
      },
      error: (error) => {
        console.error("Error al cargar el perfil:", error);
      }
    });
  }
}
