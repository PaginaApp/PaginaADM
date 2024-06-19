import { UserDTO } from './UserDTO';

class TermoDTO {
  tpr_Id: string;

  tpr_Texto: string;

  user: UserDTO;

  constructor(tpr_Id: string, tpr_Texto: string, user: UserDTO) {
    this.tpr_Id = tpr_Id;
    this.tpr_Texto = tpr_Texto;
    this.user = user;
  }
}

export { TermoDTO };
