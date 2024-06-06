import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // get endereco by user id
  async getEndereco(usu_Id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}users/${usu_Id}/endereco`,
          {
            headers: {
              //Authorization: `Bearer ${this.globalService.accessToken}`,
              // para pular a mensagem do navegador
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar getEndereco', 500);
      }
    }
  }
}
