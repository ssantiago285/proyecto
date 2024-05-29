import { Component, OnInit } from '@angular/core';
import { InteraccionesInterface } from '../../core/interface/interacciones.interface';
import { TablaComponent } from '../../components/tabla/tabla.component';
@Component({
  selector: 'app-interacciones',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './interacciones.component.html',
  styleUrl: './interacciones.component.css'
})


export class interaccionesComponent implements OnInit {
  interaciones: InteraccionesInterface[] = [];
  tituloTabla: string = 'Lista de interacciones';
  columnas: string[] = [];

  ngOnInit(): void {
    this.interaciones = [
      {
        cliente: 'cliente 4',
        llamadas: true,
        correos: false,
        reuniones: true,
        comentarios: 'comentario de la interaccion',
      },
    ];

    this.obtenerColumnas(this.interaciones);
  }

  obtenerColumnas(interacciones: InteraccionesInterface[]) {
    if (interacciones.length > 0) {
      this.columnas = Object.keys(interacciones[0]);
    }
  }
}
