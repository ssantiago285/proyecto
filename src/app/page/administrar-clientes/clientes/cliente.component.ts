import { clienteservice } from '../../../services/clientes/clientes.service';
import { Component, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../../components/tabla/tabla.component';
import { clienteInterface } from '../../../core/interface/cliente.interface';
import { ClienteModel } from '../../../core/models/cliente.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PATH } from '../../../core/enum/path.enum';
import {crearClienteInterface} from '../../../core/interface/cliente.interface'

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class clienteComponent implements OnInit {
  misClientes: clienteInterface[] = [];
  clientes: clienteInterface[] = [];
  clienteResolver: any;
  tituloTabla: string = 'Lista de clientes';
  columnas: string[] = [];
  informacion!: ClienteModel | undefined;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private clienteservice = inject(clienteservice);
  clienteSubscription!: Subscription;
  clienteSeleccionado!: ClienteModel;
 ClienteService = inject(clienteservice);


  resumenDeCliente(cliente: ClienteModel): clienteInterface {
    return {
      nombre: cliente.nombre,
      email: cliente.email,
      numeroCelular: cliente.numeroCelular,
      direccion: cliente.direccion
    };
  }
  ngOnInit(): void {
    this.clienteservice.getClientes().subscribe((resp: any) => {
      this.clientes = resp.clientes;
      this.obtenerColumnas(this.clientes);

      console.log(resp.clientes);
    });
  }
  ngOnDestroy(): void {
    this.clienteSubscription?.unsubscribe();
  }

  cargarUsuarios() {
    this.clienteSubscription = this.clienteservice
      .getClientes()
      .subscribe((resp: any) => {
        this.clientes = resp.clientes;
        this.obtenerColumnas(this.clientes);
      });
  }
  obtenerColumnas(clientes: clienteInterface[]) {
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

              <li> <b>Numero celular: </b>${this.informacion.numeroCelular}</li>

              <li> <b>Direccion: </b>${this.informacion.direccion}</li>

            </ul>`,
      icon: 'success',
    });
  }



crearClientes() {
  this.router.navigateByUrl(`${PATH.CREAR_CLIENTES}`);
}

eliminar(data: ClienteModel) {
  this.clienteservice.eliminarCliente(data._id).subscribe({
    next: async (res: any) => {
      Swal.fire(
        'Cliente',
        `El Clinte ${data.nombre} ha sido eliminado con éxito`,
        'warning'
      );
      await this.cargarUsuarios();
    },
    error: (error) => {
      Swal.fire('Error', `${error.error.msg}`, 'error');
    },
  });
}
actualizar(clienteSeleccionado : any) {
  this.clienteservice.actualizarCliente(clienteSeleccionado._id).subscribe({
    next: async (res: any) => {
      Swal.fire(
        'Cliente',
        `El Clinte ${clienteSeleccionado.nombre} ha sido eliminado con éxito`,
        'warning'
      );
      await this.cargarUsuarios();
    },
    error: (error) => {
      Swal.fire('Error', `${error.error.msg}`, 'error');
    },
  })
  const clienteActualizar: ClienteModel = {
    _id: this.clienteSeleccionado._id,
    nombre: clienteSeleccionado.nombre,
    email: clienteSeleccionado.email,
    numeroCelular: clienteSeleccionado.numeroCelular,
    direccion: clienteSeleccionado.direccion
  };

  this.ClienteService.actualizarCliente(clienteActualizar).subscribe({
    next: (res: any) => {
      Swal.fire(
        'Cliente Actualizado',
        `El Cleinte ${this.clienteSeleccionado.nombre} ha sido actualizado con éxito`,
        'success'
      );
      this.router.navigateByUrl(PATH.CLIENTES);
    },
    error: (error) => {
      Swal.fire('Error', `${error.error.msg}`, 'error');
    },
  });
}
}
