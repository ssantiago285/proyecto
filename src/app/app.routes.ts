import { Routes } from '@angular/router';
import { PATH } from './core/enum/path.enum';
import { InicioComponent } from './page/inicio/inicio.component';
import { clienteComponent } from './page/clientes/cliente.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { leadsComponent } from './page/leads/leads.component';
import { interaccionesComponent } from './page/interacciones/interacciones.component';
import { LoginComponent } from './auth/login/login.component';

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
        component: interaccionesComponent,
      },
    ],
  },
];
