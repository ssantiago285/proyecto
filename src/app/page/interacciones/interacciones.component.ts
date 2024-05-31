import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { interaccionservice} from '../../services/interacciones/interacciones.service';
import { InteraccionModel } from '../../core/models/interaccion.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-interacciones',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './interacciones.component.html',
  styleUrl: './interacciones.component.css',
})
export class InteraccionesComponent implements OnInit, OnDestroy {
  interaccion: InteraccionModel[] = [];
  tituloTabla: string = 'Lista de interacciones';
  columnas: string[] = [];
  informacion!: InteraccionModel;

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

  obtenerColumnas(interaccion: InteraccionModel[]) {
    if (interaccion.length > 0) {
      this.columnas = Object.keys(interaccion[0]);
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
}







