import { clienteservice } from './../../services/clientes/clientes.service';
import { Component, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { clienteInterface } from '../../core/interface/cliente.interface';
import { ClienteModel } from '../../core/models/cliente.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class clienteComponent implements OnInit {
  clientes: ClienteModel[] = [];
  tituloTabla: string = 'Lista de clientes';
  columnas: string[] = [];
  informacion!: ClienteModel;

  clientesubscription: Subscription = new Subscription();

  clienteservice = inject(clienteservice);

  ngOnInit(): void {
    this.clienteservice.getClientes().subscribe((resp: any) => {
      this.clientes = resp.clientes;
      this.obtenerColumnas(this.clientes);

      console.log(resp.clientes);
    });
  }
  ngOnDestroy(): void {
    this.clientesubscription?.unsubscribe();
  }

  obtenerColumnas(clientes: ClienteModel[]) {
    if (this.clientes.length > 0) {
      this.columnas = Object.keys(clientes[0]);
    }
  }
  recibirInformacion(data: ClienteModel) {
    this.informacion = data;
    Swal.fire({
      title: 'Información',
      html: `<ul>
              <li> <b>Nombre: </b>${this.informacion.nombre}</li>

              <li> <b>Email: </b>${this.informacion.email}</li>

              <li> <b>Nombre: </b>${this.informacion.numeroCelular}</li>

              <li> <b>Email: </b>${this.informacion.direccion}</li>

              <li> <b>Email: </b>${this.informacion.createdAt}</li>

            </ul>`,
      icon: 'success',
    });

    this.obtenerColumnas(this.clientes);
  }
}
