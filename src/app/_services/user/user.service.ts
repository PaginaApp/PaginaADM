import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { IPaginatedRequest } from '../../dto/IPaginatedRequest';
import { IPaginatedResponse } from '../../dto/IPaginatedResponse';
import { UserDTO } from '../../dto/UserDTO';
import { EnderecoService } from '../Endereco/endereco.service';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
    private enderecoService: EnderecoService
  ) {}

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

      // adiciona o endereco ao usuário
      for (const user of response.results) {
        console.log(user.usu_Id);
        const endereco = await this.enderecoService.getEndereco(user.usu_Id);
        if (endereco instanceof ErrorDTO && endereco.code === 404) {
          user.usu_Endereco = null;
        }
        user.usu_Endereco = endereco;
      }

      return {
        results: response.results,
        total: response.total,
        page: response.page,
        limit: response.limit,
      };
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
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
