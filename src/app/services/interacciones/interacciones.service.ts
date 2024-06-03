import { InteraccionModel } from './../../core/models/interaccion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginInterface } from '../../core/interface/login.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { PATH } from '../../core/enum/path.enum';
import { crearInteraccionesInterface } from '../../core/interface/interacciones.interface';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class interaccionservice {
  private router = inject(Router);

  interaccion!: InteraccionModel;

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
          const {
            _id,
            cliente,
            llamadas,
            correos,
            reuniones,
            comentarios,
            createdAt,
          } = resp.interaccion;

          this.interaccion = new InteraccionModel(
            _id,
            createdAt,
            cliente,
            llamadas,
            correos,
            reuniones,
            comentarios,
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

  getInteracciones() {
    return this.httpClient.get(`${base_url}/interaccion`, this.headers);
  }

  getUnInteraccion(id: string) {
    return this.httpClient.get(`${base_url}/interaccion/${id}`, this.headers);
  }

  crearInteraccion(interaccion: crearInteraccionesInterface) {
    return this.httpClient.post(`${base_url}/interaccion`, interaccion, this.headers);
  }

  actualizarInteraccion(interaccion: InteraccionModel) {
    return this.httpClient.put(
      `${base_url}/interaccion/${interaccion._id}`,
      interaccion,
      this.headers
    );
  }

  eliminarInteraccion(id: string) {
    return this.httpClient.delete(`${base_url}/interaccion/${id}`, this.headers);
  }
}
