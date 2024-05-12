class SessionDTO {
  accessToken: string;
  user: {
    usu_Id: string;
    usu_Nome: string;
    usu_Email: string;
    usu_Telefone: string;
  };

  constructor(
    accessToken: string,
    user: {
      usu_Id: string;
      usu_Nome: string;
      usu_Email: string;
      usu_Telefone: string;
    }
  ) {
    this.accessToken = accessToken;
    this.user = user;
  }
}

export { SessionDTO };
