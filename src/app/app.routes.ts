import { Routes } from '@angular/router';
import { PATH } from './core/enum/path.enum';
import { InicioComponent } from './page/inicio/inicio.component';
import { clienteComponent } from './page/administrar-clientes/clientes/cliente.component';
import { UsuariosComponent } from './page/administrar-usuarios/usuarios/usuarios.component';
import { leadsComponent } from './page/administrar-leads/leads/leads.component';
import { InteraccionesComponent} from './page/administrar-interacciones/interacciones/interacciones.component';
import { LoginComponent } from './auth/login/login.component';
import { CrearclientesComponent } from './page/administrar-clientes/crearclientes/crearclientes.cmponent';
import { CrearUsuariosComponent } from './page/administrar-usuarios/crear-usuarios/crear-usuarios.component';
import { CrearInteraccionesComponent } from './page/administrar-interacciones/crearinteracciones/crear-interacciones.component';
import { CrearLeadsComponent } from './page/administrar-leads/crear-leads/crear-leads.component';

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
        component: clienteComponent,
      },
      {
        path: PATH.USUARIO,
        title: 'Usuarios',
        component: UsuariosComponent,
      },
      {
        path: PATH.LEADS,
        title: 'leads',
        component: leadsComponent,
      },
      {
        path: PATH.INTERACCIONES,
        title: 'Interacciones',
        component: InteraccionesComponent,
      },
      {
        path: `${PATH.CREAR_CLIENTES}/:id`,
        title: 'Crear clientes',
        component: CrearclientesComponent,
      },
      {
        path: PATH.ACTUALIZAR_CLIENTES,
        title: 'Actualizar clientes',
        component: CrearclientesComponent,
      },
      {
        path: `${PATH.CREAR_USUARIOS}/:id`,
        title: 'Crear Usuarios',
        component: CrearUsuariosComponent,
      },
      {
        path: `${PATH.CREAR_INTERACCIONES}`,
        title: 'Crear Interacciones',
        component: CrearInteraccionesComponent,
      },
      {
        path: `${PATH.ACTUALIZAR_INTERACCIONES}/:id`,
        title: 'Actualizar interacciones',
        component: CrearInteraccionesComponent,
      },
      {
        path: `${PATH.CREAR_LEADS}/:id`,
        title: 'Crear leads',
        component: CrearLeadsComponent,
      },
      {
        path: `${PATH.ACTUALIZAR_LEAD}/:id`,
        title: 'Actualizar leads',
        component: CrearLeadsComponent,
      },
    ],
  },
];
