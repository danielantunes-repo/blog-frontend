export class Post {
  id!: number;
  titulo!: string;
  texto!: string;
  autor!: {
    id: number;
    name: string;
    username: string;
  };
  date!: Date | string;

  constructor(
    id: number,
    titulo: string,
    texto: string,
    autor: { name: string; username: string; id: number }
  ) {
    this.id = id;
    this.titulo = titulo;
    this.texto = texto;
    this.autor = autor;
  }
}
