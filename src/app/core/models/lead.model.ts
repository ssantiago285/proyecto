export class LeadModel {
  nombre: any;
  email: any;
  numeroCelular: any;
  direccion: any;
  constructor(
    public readonly _id: string,
    public cliente: string,
    public descripcion: string,
    public estado: boolean,
    public createdAt: Date
  ) {}
}
