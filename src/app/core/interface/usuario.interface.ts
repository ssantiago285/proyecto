export interface crearUsuarioInterface {
  nombre: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  numeroCelular?: number;
  password?: string;
  rol?: string;
}
