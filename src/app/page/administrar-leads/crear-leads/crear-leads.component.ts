import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PATH } from '../../../core/enum/path.enum';
import { LeadModel } from '../../../core/models/lead.model';
import { crearLeadsInterface } from '../../../core/interface/leads.interface';
import { LeadsService } from '../../../services/leads/leads.service';

@Component({
  selector: 'app-crear-leads',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-leads.component.html',
  styleUrls: ['./crear-leads.component.css'],
})
export class CrearLeadsComponent implements OnInit, OnDestroy {
leadsForm!: FormGroup;
  leadsSubscription!: Subscription;
  leadSeleccionado!: LeadModel;

  private formBuilder = inject(FormBuilder);
  private leadsService = inject(LeadsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.crearFormulario();
    this.activatedRoute.params.subscribe(({ id }) => {
      if (id) {
        this.buscarLead(id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.leadsSubscription) {
      this.leadsSubscription.unsubscribe();
    }
  }

  crearFormulario() {
    this.leadsForm = this.formBuilder.group({
      cliente: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      estado: ['', [Validators.required]],


    });
  }

  buscarLead(lead: string) {
    if (lead !== 'nuevo') {
      this.leadsSubscription = this.leadsService.getUnlead(lead).subscribe({
        next: (res: any) => {
          const {
            cliente,
            descripcion,
            estado,
          } = res.lead;

          this.leadSeleccionado = res.lead;


          Swal.fire(
            'Lead',
            `Se encontró el lead ${res.lead.cliente}`,
            'info'
          );

          this.leadsForm.patchValue({
            cliente,
            descripcion,
            estado,
          });
        },
        error: (error: any) => {
          Swal.fire('Error', 'Error al encontrar el lead', 'error');
        },
      });
    }
  }

  crearLead() {
    if (!this.leadsForm.valid) {
      Swal.fire('Crear lead', 'Por favor complete el formulario', 'info');

      return;
    }

    const data = this.leadsForm.value;
    const leadNuevo: crearLeadsInterface = {
      cliente:data.cliente,
      descripcion: data.descripcion,
      estado:data.estado,
    };


    if (this.leadSeleccionado) {
      this.actualizarLead(leadNuevo);


    } else {
      this.leadsService.crearUnLead(leadNuevo).subscribe({
        next: (res: any) => {

          Swal.fire(
             'lead',
            `El lead  del cliente ${data.cliente} ha sido creada con éxito`,
            'success'
          );
          this.router.navigateByUrl(PATH.LEADS);
        },
        error: (error) => {
          Swal.fire('Error', `${error.error.msg}`, 'error');
        },
      });
    }
  }

  resetFormulario() {
    this.leadsForm.reset();
  }

  actualizarLead(leads: crearLeadsInterface) {
    const leadActualizar: LeadModel = {
      _id: this.leadSeleccionado._id,
      cliente:leads.cliente,
      descripcion:leads.descripcion,
      estado:leads.estado
    };
    console.log(leadActualizar);

    this.leadsService.actualizarLead(leadActualizar).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Lead Actualizado',
          `El Lead ${this.leadSeleccionado.cliente} ha sido actualizado con éxito`,
          'success'
        );
        this.router.navigateByUrl(PATH.LEADS);
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.msg}`, 'error');
      },
    });
  }
}
