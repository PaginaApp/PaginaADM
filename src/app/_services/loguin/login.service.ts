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

  async logout(usu_Id: string, token: string): Promise<boolean | ErrorDTO> {
    try {
      await firstValueFrom(
        this.http.delete<any>(
          `${this.globalService.baseUrl}session/${usu_Id}`,
          {
            body: {
              refresh_token: token,
            },
          }
        )
      );
      return true;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar logout', 500);
      }
    }
  }

  async refreshToken(
    usu_Id: string,
    token: string
  ): Promise<SessionDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.put<any>(`${this.globalService.baseUrl}session/${usu_Id}`, {
          token: token,
        })
      );

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
        return new ErrorDTO('Erro ao chamar refreshToken', 500);
      }
    }
  }

  async verifyToken(
    token: string,
    user_Id: string
  ): Promise<boolean | ErrorDTO> {
    try {
      await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}session/${user_Id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            // para pular a mensagem do navegador
            'ngrok-skip-browser-warning': 'true',
          },
        })
      );
      return true;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar verifyToken', 500);
      }
    }
  }
}
