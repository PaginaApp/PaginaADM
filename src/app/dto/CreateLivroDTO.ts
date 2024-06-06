class CreateLivroDTO {
  liv_Titulo: string;
  liv_Ano: string;
  liv_Sinopse: string;
  liv_ISBN: string;
  liv_aut_id: string;
  liv_edi_id: string;
  liv_cat_id: string[];

  constructor(
    liv_Titulo: string,
    liv_Ano: string,
    liv_Sinopse: string,
    liv_ISBN: string,
    liv_aut_id: string,
    liv_edi_id: string,
    liv_cat_id: string[]
  ) {
    this.liv_Titulo = liv_Titulo;
    this.liv_Ano = liv_Ano;
    this.liv_Sinopse = liv_Sinopse;
    this.liv_ISBN = liv_ISBN;
    this.liv_aut_id = liv_aut_id;
    this.liv_edi_id = liv_edi_id;
    this.liv_cat_id = liv_cat_id;
  }
}

export { CreateLivroDTO };
