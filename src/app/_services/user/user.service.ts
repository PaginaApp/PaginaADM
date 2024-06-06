import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private enderecoService: EnderecoService,
    private routes: Router
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
          console.log('Endereço não encontrado');
          // adiciona um endereço default
          user.usu_Endereco = {
            usu_Bairro: 'Bairro não informado',
            usu_CEP: 'CEP não informado',
            usu_Complemento: 'Complemento não informado',
            usu_Numero: 'Número não informado',
            usu_Rua: 'Rua não informada',
            usu_cid: {
              cid_Id: 'Cidade não informada',
              cid_Nome: 'Cidade não informada',
              cid_est: {
                est_Id: 'Estado não informado',
                est_Nome: 'Estado não informado',
              },
            },
          };
        } else {
          user.usu_Endereco = endereco;
        }
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

  // altera a senha do usuário
  async changePassword(
    usu_Senha: string,
    novaSenha: string
  ): Promise<boolean | ErrorDTO> {
    try {
      if (!sessionStorage.getItem('user')) {
        window.alert('Usuário não logado');
        this.routes.navigate(['/login']);
      }

      const user = JSON.parse(sessionStorage.getItem('user')!);

      const data = {
        usu_Senha,
        novaSenha,
      };

      await firstValueFrom(
        this.http.put<any>(
          `${this.globalService.baseUrl}users/${user.usu_Id}/senha`,
          data,
          {
            headers: {
              //Authorization: `Bearer ${this.globalService.accessToken}`,
              // para pular a mensagem do navegador
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
      );
      return true;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar changePassword', 500);
      }
    }
  }
}
