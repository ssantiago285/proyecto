export class LeadModel {

  constructor(
    public readonly _id: string,
    public cliente: string,
    public descripcion: string,
    public estado: boolean,

  ) {}
}
