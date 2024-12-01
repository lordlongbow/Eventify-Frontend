import { Component, ChangeDetectorRef } from '@angular/core';
import { API_BASE_URL } from '../../app.config';

//Serices
import { AlertaService } from '../../services/alerta-services/alerta-service.service';
import { EventoService } from '../../services/evento-services/evento-service.service';
import { TokenService } from '../../services/tokenServices/token-service.service';

//Router 
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-evento-component',
  standalone: true, // Indica que este es un componente standalone
  imports: [RouterLink], // Importa RouterLink si es necesario para la navegación
  templateUrl: './evento-component.component.html',
  styleUrls: ['./evento-component.component.css'],
})
export class EventoComponentComponent {
  API_BASE_URL = API_BASE_URL;

  evento = {
    idEvento: 0,
    nombre: '',
    fecha: '',
    ubicacion: '',
    descripcion: '',
    fotoRuta: '',
    idOrganizador: '',
  };
  listaAsistentes: any[] = [];

  esOrganizador: boolean = false;
  participando: boolean = false;

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute, 
    private tokenService: TokenService, 
    private dialog: MatDialog,
    private AlertaService: AlertaService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.detalle(id);
  }

  detalle(id: number) {
    this.eventoService.detalle(id).subscribe(
      (data: any) => {
        console.log(data[0])
        this.procesarEvento(data[0]);
        this.verificarOrganizador(data[0]);
        this.cdr.detectChanges();  // Detecta los cambios manualmente
      },
      () => this.AlertaService.mostrarError('Error de Servidor', 'No se pudo conectar con el servidor. Por favor, intente mas tarde.')
    );
  }

  procesarEvento(evento: any) {
    const fecha = new Date(evento.fecha).toISOString().split('T')[0];
    this.evento = { ...evento, fecha };
    console.log('Evento procesado:', this.evento);
  }  

  verificarOrganizador(evento: any) {
    const idUsuarioLogueado = this.tokenService.getId();
    this.esOrganizador = idUsuarioLogueado === +this.evento.idOrganizador;
    console.log('ID del usuario logueado:', idUsuarioLogueado);
    console.log('ID del organizador:', this.evento.idOrganizador);
    console.log('Es organizador:', this.esOrganizador);
  }

  abrirModal(modalRef: any) {
    this.eventoService.obtenerAsistentes(this.evento.idEvento).subscribe(
      (data: any) => {
        this.listaAsistentes = data.asistentes;
        console.log(data.asistentes);
        if(this.listaAsistentes.length > 0){
          this.dialog.open(modalRef);
        }else{
         this.AlertaService.mostrarInformacion('No hay asistentes', 'No hay asistentes registrados en este evento.');
        }
      },
      () => this.AlertaService.mostrarError('Error de Servidor', 'No se pudo conectar con el servidor. Por favor, intente mas tarde.')
    );
  }

  cerrarModal() {
    this.dialog.closeAll();
  }

  // Guardar cambios en la asistencia
  guardarAsistencia() {
 
  }

  seleccionarAsistente(asistente: number) {
   this.eventoService.actualizarAsistencia(this.evento.idEvento, asistente).subscribe(
     () => this.AlertaService.mostrarExito('Asistencia actualizada', 'Asistencia actualizada con exito'),
     () => this.AlertaService.mostrarError('Error de Servidor', 'No se pudo conectar con el servidor. Por favor, intente mas tarde.')
   )
  }

  // Participar en un evento
  participar() {
    let idAsistente = this.tokenService.getId()!;

    if (this.participando) return;

    this.eventoService.participar(this.evento.idEvento, idAsistente).subscribe(
      () => {
        this.participando = true;
        this.AlertaService.mostrarExito('Participando', 'Participando en el evento');
      }
    );
  }
}
