export class ClienteModel {
  constructor(
    public readonly _id: string,
    public nombre: string,
    public email: string,
    public direccion: string,
    public createdAt: Date,
    public numeroCelular?: number
  ) {}
}
