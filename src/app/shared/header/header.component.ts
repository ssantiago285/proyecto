import { UsuariosService } from './../../services/usuarios/usuarios.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuInfoInterface } from '../../core/interface/menu_info.interface';
import { MenuRoutes } from '../../menu/menu';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuItems: MenuInfoInterface[] = [];
  hover: boolean;
  loginForm: any;

  private usuarioServices = inject(UsuariosService);

  constructor() {
    this.hover = false;
  }

  ngOnInit(): void {
    this.menuItems = MenuRoutes;
    console.log(this.menuItems);
  }

  onMouseEnter() {
    this.hover = true;
  }

  onMouseLeave() {
    this.hover = false;
  }
  cerrarSesion() {
    this.usuarioServices.logout();
  }
}
