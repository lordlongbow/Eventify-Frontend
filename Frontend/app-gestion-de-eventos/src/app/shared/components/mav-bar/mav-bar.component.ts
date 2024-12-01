import { Component } from '@angular/core';
//Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

//httpClient
import { HttpClient } from '@angular/common/http';

//router
import { Router } from '@angular/router';

//loginservices

import { LoginServicesService } from '../../../services/login-services/login-services.service';
import { TokenService } from '../../../services/tokenServices/token-service.service';

@Component({
  selector: 'app-mav-bar',
  standalone: true,
  imports: [ MatIconModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, RouterOutlet,RouterLink],
  templateUrl: './mav-bar.component.html',
  styleUrl: './mav-bar.component.css'
})
export class MavBarComponent {
 
  apiBaseUIrl = 'http://localhost:3000/asistentes'

  constructor(private router: Router, private http: HttpClient, private loginService: LoginServicesService, private tokenService: TokenService) {   }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }


  logout(): void {
    this.tokenService.logout();
  
  }
  
}
