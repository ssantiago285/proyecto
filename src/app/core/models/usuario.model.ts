export class UsuarioModel {
  constructor(
     public readonly _id: string,
    public nombre: string,
    public email: string,
    public tipoDocumento: string,
    public numeroDocumento: string,
    public rol: string,
    public createdAt?: Date,
    public numeroCelular?: number,
    public password?: string,
  ) {}
}
