export class InteraccionModel {
  constructor(
    public readonly _id: string,
    public cliente: string,
    public llamadas: Boolean,
    public correos: Boolean,
    public reuniones: boolean,
    public comentarios: string,
    public createdAt?: Date
  ) {}
}
