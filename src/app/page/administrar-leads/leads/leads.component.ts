import { LeadsService } from '../../../services/leads/leads.service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { TablaComponent } from '../../../components/tabla/tabla.component';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LeadModel } from '../../../core/models/lead.model';
import { PATH } from '../../../core/enum/path.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadsInterface } from '../../../core/interface/leads.interface';

@Component({
  selector: 'app-lead',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css',
})
export class leadsComponent implements OnInit, OnDestroy {

  leads: LeadModel[] = [];
  tituloTabla: string = 'Lista de leads';
  columnas: string[] = [];
  informacion!: LeadModel;

  leadsubscription!: Subscription;


  private LeadsService = inject(LeadsService);
  private router = inject(Router);

  ngOnInit(): void {

    this.cargarLeads();
  }

  ngOnDestroy(): void {
    this.leadsubscription?.unsubscribe();
  }



  cargarLeads() {
    this.leadsubscription = this.LeadsService
      .getLeads()
      .subscribe((resp: any) => {
        this.leads = resp.leads;
        this.obtenerColumnas(this.leads);
      });
  }

  obtenerColumnas(leads: LeadModel[]) {
    if (leads.length > 0) {
      this.columnas = Object.keys(leads[0]);
    }
  }
  recibirInformacion(data: LeadModel) {
    this.informacion = data;
    Swal.fire({
      title: 'Información',
      html: `<ul>
              <li> <b>Cliente: </b>${this.informacion.cliente}</li>

              <li> <b>Descripcion: </b>${this.informacion.descripcion}</li>

              <li> <b>Estado: </b>${this.informacion.estado}</li>

            </ul>`,
      icon: 'success',
    });

  }
  crearLeads() {
    this.router.navigateByUrl(`${PATH.CREAR_LEADS}/nuevo`);
  }
  actualizarlead(data: LeadModel) {
    this.router.navigateByUrl(`${PATH.CREAR_LEADS}/${data._id}`);
  }

  eliminar(data: LeadModel) {
    this.LeadsService.eliminarLead(data._id).subscribe({
      next: async (res: any) => {
        Swal.fire(
          'Lead',
          `El lead de el cliente ${data.cliente} ha sido eliminada con éxito`,
          'warning'
        );

        await this.cargarLeads();

      },

      error: (error) => {
        Swal.fire('Error', `${error.error.msg}`, 'error');
      },

    });
  }
}
