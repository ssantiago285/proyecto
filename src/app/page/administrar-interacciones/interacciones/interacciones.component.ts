import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../../components/tabla/tabla.component';
import { interaccionservice} from '../../../services/interacciones/interacciones.service';
import { InteraccionModel } from '../../../core/models/interaccion.model';
import { Subscription } from 'rxjs';
import { PATH } from '../../../core/enum/path.enum';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { interaccionInterface } from '../../../core/interface/interacciones.interface';



@Component({
  selector: 'app-interacciones',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './interacciones.component.html',
  styleUrl: './interacciones.component.css',
})
export class InteraccionesComponent implements OnInit, OnDestroy {
  interaccion: interaccionInterface[] = [];
  tituloTabla: string = 'Lista de interacciones';
  columnas: string[] = [];
  interacciones: interaccionInterface[] = [];
  informacion!: InteraccionModel;
  private router = inject(Router);
  interaccionSubscription: Subscription = new Subscription;


  interaccionService = inject(interaccionservice);

  ngOnInit(): void {
    this.interaccionService.getInteracciones().subscribe((resp: any) => {
      this.interaccion = resp.interaccion;
      this.obtenerColumnas(this.interaccion);

      console.log(resp.interaccion);
    });
  }
  ngOnDestroy(): void {
    this.interaccionSubscription?.unsubscribe();
  }
  cargarInteracciones() {
    this.interaccionSubscription = this.interaccionService
      .getInteracciones()
      .subscribe((resp: any) => {
        this.interaccion = resp.interaccion;
        this.obtenerColumnas(this.interaccion);
      });
    }
  obtenerColumnas(interacciones: interaccionInterface[]) {
    if (interacciones.length > 0) {
      this.columnas = Object.keys(interacciones[0]);
    }
  }
  recibirInformacion(data: InteraccionModel) {
    this.informacion = data;
    Swal.fire({
      title: 'Información',
      html: `<ul>
              <li> <b>Cliente: </b>${this.informacion.cliente}</li>

              <li> <b>llamadas: </b>${this.informacion.llamadas}</li>

              <li> <b>Reuniones: </b>${this.informacion.reuniones}</li>

              <li> <b>Comentarios: </b>${this.informacion.comentarios}</li>

              <li> <b>CREATED AT: </b>${this.informacion.createdAt}</li>
            </ul>`,
      icon: 'success',
    });
  }
  crearInteracciones() {
    this.router.navigateByUrl(`${PATH.CREAR_INTERACCIONES}`);
  }
  actualizarInteraccion(data: InteraccionModel) {
    this.router.navigateByUrl(`${PATH.ACTUALIZAR_INTERACCIONES}/${data._id}`);
  }

  eliminar(data: InteraccionModel) {
    this.interaccionService.eliminarInteraccion(data._id).subscribe({
      next: async (res: any) => {
        Swal.fire(
          'Interaccion',
          `La interaccion de el cliente ${data.cliente} ha sido eliminada con éxito`,
          'warning'
        );
        await this.cargarInteracciones();
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.msg}`, 'error');
      },
    });
  }
}







