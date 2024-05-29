import { PATH } from '../core/enum/path.enum';
import { MenuInfoInterface } from '../core/interface/menu_info.interface';

export const MenuRoutes: MenuInfoInterface[] = [
  {
    path: PATH.HOME,
    title: 'Home',
    icon: 'fa-solid fa-house',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.CLIENTES,
    title: 'Clientes',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.USUARIO,
    title: 'Ver Usuarios',
    icon: '',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.LEADS,
    title: 'Ver leads',
    icon: '',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.INTERACCIONES,
    title: 'Interacciones',
    icon: '',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.LOGIN,
    title: 'login',
    classCss: '',
    subMenu: [],
  },
];
