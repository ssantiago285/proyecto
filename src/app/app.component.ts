import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { clienteComponent } from './page/administrar-clientes/clientes/cliente.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    InicioComponent,
    clienteComponent,
    HeaderComponent,
    FooterComponent,

  ],
})
export class AppComponent {
  title = 'my-first-project';

  nombre: string = 'xxx xxx';
}
