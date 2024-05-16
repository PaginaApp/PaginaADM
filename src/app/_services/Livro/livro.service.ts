import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { IPaginatedResponse } from '../../dto/IPaginatedResponse';
import { LivroDTO } from '../../dto/LivroDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // Método para listar todos os livros
  async listarLivros(
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<LivroDTO> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}livro/titulo`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            // para pular a mensagem do navegador
            'ngrok-skip-browser-warning': 'true',
          },
          params: {
            page,
            limit,
          },
        })
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar listUsers', 500);
      }
    }
  }
}
