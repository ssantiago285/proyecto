import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  clienteInterface,crearClienteInterface
} from '../../../core/interface/cliente.interface';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { clienteservice } from '../../../services/clientes/clientes.service';
import { ClienteModel } from '../../../core/models/cliente.model';
import { Subscription } from 'rxjs';
import { PATH } from '../../../core/enum/path.enum';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crearclientes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crearclientes.component.html',
  styleUrl: './crearclientes.component.css',
})
export class CrearclientesComponent implements OnInit {
  clienteForm! : FormGroup;
  clienteSubscription!: Subscription;
  clienteSeleccionado!: ClienteModel;

  private formBuilder = inject(FormBuilder);
  private ClienteService = inject(clienteservice);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


  ngOnInit(): void {
    this.crearFormulario();
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.buscarCliente(id);
      }
    });
  }
  crearFormulario() {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numeroCelular: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }
  buscarCliente(nombre: string) {
    if (nombre !== 'nuevo') {
      this.clienteSubscription = this.ClienteService.getUnCliente(nombre).subscribe({
        next: (res: any) => {
          const {
            nombre,
            email,
            numeroCelular,
            direccion
          } = res.cliente;

          this.clienteSeleccionado = res.cliente;

          Swal.fire(
            'Cliente',
            `Se encontró el cliente ${res.cliente.nombre}`,
            'info'
          );
          this.clienteForm.patchValue({
            nombre,
            email,
            numeroCelular,
            direccion
          });
        },
        error: (error: any) => {
          Swal.fire('Error', 'Error al encontrar el usuario', 'error');
        },
      });
    }
  }

  crearCliente() {
    if (!this.clienteForm.valid) {
      Swal.fire('Crear usuario', 'Por favor complete el formulario', 'info');
      return;
    }
    const data = this.clienteForm.value;
    const nuevoCliente: crearClienteInterface = {
      _id: data._id,
      nombre: data.nombre,
      numeroCelular: data.numeroCelular,
      email : data.email,
      direccion : data.direccion

    };

    if (this.clienteSeleccionado) {
      this.actualizarCliente(nuevoCliente);
    } else {
      this.ClienteService.crearUnCliente(nuevoCliente).subscribe({
        next: (res: any) => {
          Swal.fire(
            'cliente',
            `El cliente ${data.nombre} ha sido creado con éxito`,
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

  resetFormulario() {
    this.clienteForm.reset();
  }
  actualizarCliente(cliente: crearClienteInterface) {
    const clienteActualizar: ClienteModel = {
      _id: this.clienteSeleccionado._id,
      nombre: cliente.nombre,
      email: cliente.email,
      numeroCelular: cliente.numeroCelular,
      direccion: cliente.direccion
    };

    this.ClienteService.actualizarCliente(clienteActualizar).subscribe({
      next: (res: any) => {
        Swal.fire(
          'cliente Actualizado',
          `El usuario ${this.clienteSeleccionado.nombre} ha sido actualizado con éxito`,
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
