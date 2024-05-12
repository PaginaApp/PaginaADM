import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { IPaginatedRequest } from '../../dto/IPaginatedRequest';
import { IPaginatedResponse } from '../../dto/IPaginatedResponse';
import { UserDTO } from '../../dto/UserDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // listagem paginada de usuários
  async listUsers(
    data: IPaginatedRequest<UserDTO>
  ): Promise<IPaginatedResponse<UserDTO> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}users`, {
          headers: {
            //Authorization: `Bearer ${this.globalService.accessToken}`,
            // para pular a mensagem do navegador
            'ngrok-skip-browser-warning': 'true',
          },
          params: {
            page: data.page,
            limit: data.limit,
          },
        })
      );

      console.log(response);

      return {
        results: response.results,
        total: response.total,
        page: response.page,
        limit: response.limit,
      };
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.log(error.error.message);
        return new ErrorDTO(error.error.message, error.status);
      } else {
        console.log('confuso2');
        return new ErrorDTO('Erro ao chamar listUsers', 500);
      }
    }
  }

  // deletar usuário
  async deleteUser(usu_Id: string): Promise<boolean | ErrorDTO> {
    try {
      await firstValueFrom(
        this.http.delete<any>(`${this.globalService.baseUrl}users/${usu_Id}`, {
          headers: {
            //Authorization: `Bearer ${this.globalService.accessToken}`,
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
        return new ErrorDTO('Erro ao chamar deleteUser', 500);
      }
    }
  }
}
