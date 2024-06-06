import { AutorDTO } from './AutorDTO';
import { CategoriaDTO } from './CategoriaDTO';
import { EditoraDTO } from './EditoraDTO';

class LivroDTO {
  liv_Id: string;
  liv_Titulo: string;
  liv_Ano: string;
  liv_Sinopse: string;
  liv_ISBN: string;
  autor: AutorDTO;
  editora: EditoraDTO;
  categorias: CategoriaDTO;

  constructor(
    liv_Id: string,
    liv_Titulo: string,
    liv_Ano: string,
    liv_Sinopse: string,
    liv_ISBN: string,
    autor: AutorDTO,
    editora: EditoraDTO,
    categoria: CategoriaDTO
  ) {
    this.liv_Id = liv_Id;
    this.liv_Titulo = liv_Titulo;
    this.liv_Ano = liv_Ano;
    this.liv_Sinopse = liv_Sinopse;
    this.liv_ISBN = liv_ISBN;
    this.autor = autor;
    this.editora = editora;
    this.categorias = categoria;
  }
}

export { LivroDTO };
