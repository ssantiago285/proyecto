import { LeadsService } from './../../services/leads/leads.service';
import { Component, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LeadModel } from '../../core/models/lead.model';

@Component({
  selector: 'app-lead',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css',
})
export class leadsComponent implements OnInit {
  leads: LeadModel[] = [];
  tituloTabla: string = 'Lista de leads';
  columnas: string[] = [];
  informacion!: LeadModel;

  leadsubscription: Subscription = new Subscription();

  LeadsService = inject(LeadsService);

  ngOnInit(): void {
    this.LeadsService.getLeads().subscribe((resp: any) => {
      this.leads = resp.leads;
      this.obtenerColumnas(this.leads);

      console.log(resp.leads);
    });
  }
  ngOnDestroy(): void {
    this.leadsubscription?.unsubscribe();
  }

  obtenerColumnas(clientes: LeadModel[]) {
    if (this.leads.length > 0) {
      this.columnas = Object.keys(this.leads[0]);
    }
  }
  recibirInformacion(data: LeadModel) {
    this.informacion = data;
    Swal.fire({
      title: 'Información',
      html: `<ul>
              <li> <b>Nombre: </b>${this.informacion.cliente}</li>

              <li> <b>Email: </b>${this.informacion.descripcion}</li>

              <li> <b>Nombre: </b>${this.informacion.estado}</li>

              <li> <b>Email: </b>${this.informacion.createdAt}</li>


            </ul>`,
      icon: 'success',
    });

    this.obtenerColumnas(this.leads);
  }
}
