import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { SessionDTO } from '../../dto/SesionDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  async createSession(
    email: string,
    senha: string
  ): Promise<SessionDTO | ErrorDTO> {
    try {
      // Envie a solicitação HTTP e use firstValueFrom para aguardar a primeira emissão do Observable
      const response = await firstValueFrom(
        this.http.post<any>(`${this.globalService.baseUrl}session`, {
          usu_Email: email,
          usu_Senha: senha,
        })
      );

      console.log(response);
      return {
        accessToken: response.accessToken,
        user: {
          usu_Id: response.user.usu_Id,
          usu_Nome: response.user.usu_Nome,
          usu_Email: response.user.usu_Email,
          usu_Telefone: response.user.usu_Telefone,
        },
      };
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar createSession', 500);
      }
    }
  }
}
