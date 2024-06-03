import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { InteraccionModel } from '../../../core/models/interaccion.model';
import { PATH } from '../../../core/enum/path.enum';
import { interaccionservice } from '../../../services/interacciones/interacciones.service';
import { crearInteraccionesInterface } from '../../../core/interface/interacciones.interface';


@Component({
  selector: 'app-crear-interacciones',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-interacciones.component.html',
  styleUrls: ['./crear-interacciones.component.css'],
})
export class CrearInteraccionesComponent implements OnInit, OnDestroy {
interaccionForm!: FormGroup;
  interaccionesSubscription!: Subscription;
  interaccionSeleccionado!: InteraccionModel;

  private formBuilder = inject(FormBuilder);
  private interaccionesService = inject(interaccionservice);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.crearFormulario();
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.buscarInteraccion(id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.interaccionesSubscription) {
      this.interaccionesSubscription.unsubscribe();
    }
  }

  crearFormulario() {
    this.interaccionForm = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      llamadas: ['', [Validators.required]],
      correos: ['', [Validators.required]],
      reuniones: ['', [Validators.required]],
      comentarios: ['', [Validators.required]],

    });
  }

  buscarInteraccion(cliente: string) {
    if (cliente !== 'nuevo') {
      this.interaccionesSubscription = this.interaccionesService.getUnInteraccion(cliente).subscribe({
        next: (res: any) => {
          const {
            cliente,
            llamadas,
            correos,
            reuniones,
            comentarios,
          } = res.interaccion;

          this.interaccionSeleccionado = res.interaccion;

          Swal.fire(
            'Interaccion',
            `Se encontró la interaccion ${res.interaccion.cliente}`,
            'info'
          );

          this.interaccionForm.patchValue({
            cliente,
            llamadas,
            correos,
            reuniones,
            comentarios,
          });
        },
        error: (error: any) => {
          Swal.fire('Error', 'Error al encontrar la interaccion', 'error');
        },
      });
    }
  }

  crearInteraccion() {
    if (!this.interaccionForm.valid) {
      Swal.fire('Crear interaccion', 'Por favor complete el formulario', 'info');
      return;
    }

    const data = this.interaccionForm.value;
    const interaccionNuevo: crearInteraccionesInterface = {
      cliente:data.cliente,
      llamadas:data.llamadas,
      correos:data.correos,
      reuniones:data.reuniones,
      comentarios:data.comentarios,

    };

    if (this.interaccionSeleccionado) {
      this.actualizarInteraccion(interaccionNuevo);
    } else {
      this.interaccionesService.crearInteraccion(interaccionNuevo).subscribe({
        next: (res: any) => {
          Swal.fire(
             'interaccion',
            `la interaccion  del cliente ${data.cliente} ha sido creada con éxito`,
            'success'
          );
          this.router.navigateByUrl(PATH.INTERACCIONES);
        },
        error: (error) => {
          Swal.fire('Error', `${error.error.msg}`, 'error');
        },
      });
    }
  }

  actualizarInteraccion(interaccion: crearInteraccionesInterface) {
    const interaccionActualizar: InteraccionModel = {
      _id: this.interaccionSeleccionado._id,
      cliente: interaccion.cliente,
      llamadas: interaccion.llamadas,
      correos: interaccion.correos,
      reuniones: interaccion.reuniones,
      comentarios: interaccion.comentarios,
      createdAt: new Date,
    };

    this.interaccionesService.actualizarInteraccion(interaccionActualizar).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Interaccion Actualizado',
          `La interaccion ${this.interaccionSeleccionado.cliente} ha sido actualizado con éxito`,
          'success'
        );
        this.router.navigateByUrl(PATH.INTERACCIONES);
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.msg}`, 'error');
      },
    });
  }
}
