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

@Component({
  selector: 'app-crearclientes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crearclientes.component.html',
  styleUrl: './crearclientes.component.css',
})
export class CrearclientesComponent implements OnInit {
  clienteForm! : FormGroup;

  private formBuilder = inject(FormBuilder);
  private ClienteService = inject(clienteservice);

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numeroCelular: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  crearCliente() {
    const data = this.clienteForm.value;
    const nuevoCliente: crearClienteInterface = {
      nombre: data.nombre,
      numeroCelular: data.numeroCelular,
      email : data.email,
      direccion : data.direccion
    };

    this.ClienteService
      .crearUnCliente(nuevoCliente)
      .subscribe((resp: any) => {
        Swal.fire('Cliente Creado', `${resp.msg}`, 'success');
        this.resetFormulario();
      });
  }

  resetFormulario() {
    this.clienteForm.reset();
  }
}
