class CategoriaDTO {
  cat_Id: string;
  cat_Nome: string;

  constructor(cat_Id: string, cat_Nome: string) {
    this.cat_Id = cat_Id;
    this.cat_Nome = cat_Nome;
  }
}

export { CategoriaDTO };
