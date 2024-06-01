export interface clienteInterface {
  nombre: string;
  email: string;
  numeroCelular: number |undefined;
  direccion: string;

}
export interface crearClienteInterface {
  _id: string;
  nombre: string;
  email: string;
  numeroCelular: number;
  direccion: string;
}
