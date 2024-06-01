import { Routes } from '@angular/router';
import { PATH } from './core/enum/path.enum';
import { InicioComponent } from './page/inicio/inicio.component';
import { clienteComponent } from './page/administrar-clientes/clientes/cliente.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { leadsComponent } from './page/leads/leads.component';
import { InteraccionesComponent} from './page/interacciones/interacciones.component';
import { LoginComponent } from './auth/login/login.component';
import { CrearclientesComponent } from './page/administrar-clientes/crearclientes/crearclientes.cmponent';

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
        path: PATH.CREAR_CLIENTES,
        title: 'Crear clientes',
        component: CrearclientesComponent,
      },
      {
        path: PATH.ACTUALIZAR_CLIENTES,
        title: 'Actualizar clientes',
        component: CrearclientesComponent,
      },

    ],
  },
];
