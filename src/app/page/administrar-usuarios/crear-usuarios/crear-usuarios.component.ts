import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { crearUsuarioInterface } from '../../../core/interface/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { PATH } from '../../../core/enum/path.enum';

@Component({
  selector: 'app-crear-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit, OnDestroy {
  usuariosForm!: FormGroup;
  usuarioSubscription!: Subscription;
  usuarioSeleccionado!: UsuarioModel;
  usuarios:UsuarioModel[]=[];

  private formBuilder = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.crearFormulario();
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.buscarUsuario(id);
      }
    });

    // this.activatedRoute.data.subscribe(({usuarios})=>{
    //   this.usuarios=usuarios;
    //   console.log(this.usuarios);
    // });


  }

  ngOnDestroy(): void {
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }

  crearFormulario() {
    this.usuariosForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      password: ['', [Validators.required]],
      numeroCelular: ['', [Validators.required]],
    });
  }

  buscarUsuario(numeroDocumento: string) {
    if (numeroDocumento !== 'nuevo') {
      this.usuarioSubscription = this.usuariosService.getUnUsuario(numeroDocumento).subscribe({
        next: (res: any) => {
          const {
            nombre,
            tipoDocumento,
            numeroDocumento,
            email,
            rol,
            numeroCelular
          } = res.usuario;

          this.usuarioSeleccionado = res.usuario;

          Swal.fire(
            'Usuario',
            `Se encontró el usuario ${res.usuario.nombre}`,
            'info'
          );

          this.usuariosForm.patchValue({
            nombre,
            email,
            tipoDocumento,
            numeroDocumento,
            rol,
            numeroCelular,
            password: ''
          });
        },
        error: (error: any) => {
          Swal.fire('Error', 'Error al encontrar el usuario', 'error');
        },
      });
    }
  }

  crearUsuario() {
    if (!this.usuariosForm.valid) {
      Swal.fire('Crear usuario', 'Por favor complete el formulario', 'info');
      return;
    }

    const data = this.usuariosForm.value;
    const usuarioNuevo: crearUsuarioInterface = {
      nombre: data.nombre,
      email: data.email,
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      rol: data.rol,
      password: data.password,
      numeroCelular: data.numeroCelular,
    };

    if (this.usuarioSeleccionado) {
      this.actualizarUsuario(usuarioNuevo);
    } else {
      this.usuariosService.crearUsuario(usuarioNuevo).subscribe({
        next: (res: any) => {
          Swal.fire(
            'Usuario',
            `El usuario ${data.nombre} ha sido creado con éxito`,
            'success'
          );
          this.router.navigateByUrl(PATH.USUARIO);
        },
        error: (error) => {
          Swal.fire('Error', `${error.error.msg}`, 'error');
        },
      });
    }
  }

  actualizarUsuario(usuario: crearUsuarioInterface) {
    const usuarioActualizar: UsuarioModel = {
      _id: this.usuarioSeleccionado._id,
      nombre: usuario.nombre,
      email: usuario.email,
      tipoDocumento: usuario.tipoDocumento,
      numeroDocumento: usuario.numeroDocumento,
      rol: usuario.rol ? usuario.rol : '',
      password: usuario.password,
      numeroCelular: usuario.numeroCelular,
    };


    this.usuariosService.actualizarUsuario(usuarioActualizar).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Usuario Actualizado',
          `El usuario ${this.usuarioSeleccionado.nombre} ha sido actualizado con éxito`,
          'success'
        );
        this.router.navigateByUrl(PATH.USUARIO);
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.msg}`, 'error');
      },
    });
  }
}
