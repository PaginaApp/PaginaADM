class UserDTO {
  usu_Id: string;
  usu_Nome: string;
  usu_Email: string;
  usu_Senha: string;
  usu_Telefone: string;
  usu_CPF: string;
  usu_Nasc: Date;
  usu_Endereco: {
    usu_Bairro: string;
    usu_CEP: string;
    usu_Complemento: string;
    usu_Numero: string;
    usu_Rua: string;
    usu_cid: {
      cid_Id: string;
      cid_Nome: string;
      cid_est: {
        est_Id: string;
        est_Nome: string;
      };
    };
  };

  constructor(
    usu_Id: string,
    usu_Nome: string,
    usu_Email: string,
    usu_Senha: string,
    usu_Telefone: string,
    usu_CPF: string,
    usu_Nasc: Date,
    usu_Endereco: {
      usu_Bairro: string;
      usu_CEP: string;
      usu_Complemento: string;
      usu_Numero: string;
      usu_Rua: string;
      usu_cid: {
        cid_Id: string;
        cid_Nome: string;
        cid_est: { est_Id: string; est_Nome: string };
      };
    }
  ) {
    this.usu_Id = usu_Id;
    this.usu_Nome = usu_Nome;
    this.usu_Email = usu_Email;
    this.usu_Senha = usu_Senha;
    this.usu_Telefone = usu_Telefone;
    this.usu_CPF = usu_CPF;
    this.usu_Nasc = usu_Nasc;
    this.usu_Endereco = usu_Endereco;
  }
}

export { UserDTO };
