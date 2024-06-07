import { Routes } from '@angular/router';
import { PATH } from './core/enum/path.enum';
import { InicioComponent } from './page/inicio/inicio.component';
import { clienteComponent } from './page/administrar-clientes/clientes/cliente.component';
import { UsuariosComponent } from './page/administrar-usuarios/usuarios/usuarios.component';
import { leadsComponent } from './page/administrar-leads/leads/leads.component';
import { InteraccionesComponent } from './page/administrar-interacciones/interacciones/interacciones.component';
import { LoginComponent } from './auth/login/login.component';
import { CrearclientesComponent } from './page/administrar-clientes/crearclientes/crearclientes.cmponent';
import { CrearUsuariosComponent } from './page/administrar-usuarios/crear-usuarios/crear-usuarios.component';
import { CrearInteraccionesComponent } from './page/administrar-interacciones/crearinteracciones/crear-interacciones.component';
import { CrearLeadsComponent } from './page/administrar-leads/crear-leads/crear-leads.component';
import { usuariosResolver } from './core/resolvers/usuarios/usuarios.resolver';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: PATH.HOME,
    title: 'Home',
    children: [
      {
        path: PATH.HOME,
        title: 'Home',

        component: InicioComponent,
      },
      {
        path: PATH.LOGIN,
        title: 'login',
        component: LoginComponent,
      },
      {
        path: PATH.CLIENTES,
        title: 'clientes',
        canActivate: [authGuard],
        component: clienteComponent,
      },
      {
        path: PATH.USUARIO,
        title: 'Usuarios',
        canActivate: [authGuard],
        component: UsuariosComponent,
      },
      {
        path: PATH.LEADS,
        title: 'leads',
        canActivate: [authGuard],
        component: leadsComponent,
      },
      {
        path: PATH.INTERACCIONES,
        title: 'Interacciones',
        canActivate: [authGuard],
        component: InteraccionesComponent,
      },
      {
        path: `${PATH.CREAR_CLIENTES}/:id`,
        title: 'Crear clientes',
        canActivate: [authGuard],
        component: CrearclientesComponent,
      },
      {
        path: PATH.ACTUALIZAR_CLIENTES,
        title: 'Actualizar clientes',
        canActivate: [authGuard],
        component: CrearclientesComponent,
      },
      {
        path: `${PATH.CREAR_USUARIOS}/:id`,
        title: 'Crear Usuarios',
        canActivate: [authGuard],
        component: CrearUsuariosComponent,
        resolve: {
          usuarios: usuariosResolver,
        },
      },
      {
        path: `${PATH.CREAR_INTERACCIONES}`,
        title: 'Crear Interacciones',
        canActivate: [authGuard],
        component: CrearInteraccionesComponent,
      },
      {
        path: `${PATH.ACTUALIZAR_INTERACCIONES}/:id`,
        title: 'Actualizar interacciones',
        canActivate: [authGuard],
        component: CrearInteraccionesComponent,
      },
      {
        path: `${PATH.CREAR_LEADS}/:id`,
        title: 'Crear leads',
        canActivate: [authGuard],
        component: CrearLeadsComponent,
      },
      {
        path: `${PATH.ACTUALIZAR_LEAD}/:id`,
        title: 'Actualizar leads',
        canActivate: [authGuard],
        component: CrearLeadsComponent,
      },
    ],
  },
];
