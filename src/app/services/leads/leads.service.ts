import { LeadModel } from './../../core/models/lead.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginInterface } from '../../core/interface/login.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PATH } from '../../core/enum/path.enum';
import { crearLeadsInterface } from '../../core/interface/leads.interface';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class LeadsService {

  private router = inject(Router);

  lead!: LeadModel;

  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  validateToken(): Observable<boolean> {
    return this.httpClient
      .get(`${base_url}/login`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { _id, cliente, descripcion, estado, createdAt} =
            resp.cliente;

          this.lead = new LeadModel(
            _id,
            cliente,
            descripcion,
            estado,
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
  }

  login(login: LoginInterface) {
    return this.httpClient.post(`${base_url}/login`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl(PATH.LOGIN);
  }

  getLeads() {
    return this.httpClient.get(`${base_url}/lead`, this.headers);
  }

  getUnlead(id: string) {
    return this.httpClient.get(`${base_url}/lead/${id}`, this.headers);
  }

  crearUnLead(lead: crearLeadsInterface) {
    return this.httpClient.post(`${base_url}/lead`, lead, this.headers);
  }

  actualizarLead(lead: LeadModel) {
    return this.httpClient.put(
      `${base_url}/lead/${lead._id}`,
      this.lead,
      this.headers
    );
  }

  eliminarLead(id: string) {
    return this.httpClient.delete(`${base_url}/lead/${id}`, this.headers);
  }
}
