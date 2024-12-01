import { Routes } from '@angular/router';


// componenets

import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { LoginComponentComponent } from './pages/login-component/login-component.component';
import { EventoComponentComponent } from './pages/evento-component/evento-component.component';
import { MiPerfilComponentComponent } from './pages/mi-perfil-component/mi-perfil-component.component';
import { ErrorComponentComponent } from './pages/error-component/error-component.component';
import { RegistroComponentComponent } from './pages/registro-component/registro-component.component';
import { MisEventosComponentComponent } from './pages/mis-eventos-component/mis-eventos-component.component';
import { NuevoComponentComponent } from './pages/nuevo-component/nuevo-component.component';
import { EditarComponentComponent } from './pages/editar-component/editar-component.component';
import { MisCertificadosComponentComponent } from './pages/mis-certificados-component/mis-certificados-component.component';
import { AuthGuard } from './guards/guardian.guard';
//rutas exportadas
export const routes: Routes = [
    { path: 'login', component: LoginComponentComponent },
    { path: 'registro', component: RegistroComponentComponent },
    { path: 'home', component: HomeComponentComponent, canActivate: [AuthGuard] },
    { path: 'evento/:id', component: EventoComponentComponent, canActivate: [AuthGuard] },
    { path: 'mi-perfil', component: MiPerfilComponentComponent, canActivate: [AuthGuard] },
    { path: 'mis-eventos', component: MisEventosComponentComponent, canActivate: [AuthGuard] },
    { path: 'nuevo', component: NuevoComponentComponent, canActivate: [AuthGuard] },
    { path: 'editar/:id', component: EditarComponentComponent, canActivate: [AuthGuard] },
    { path: 'mis-certificados', component: MisCertificadosComponentComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: ErrorComponentComponent }
  ];
  
    
//canActivate: [AuthGuard] 