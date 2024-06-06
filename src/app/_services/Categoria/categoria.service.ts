import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CategoriaDTO } from '../../dto/CategoriaDTO';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // lista categorias
  public async list(): Promise<CategoriaDTO[] | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}categoria`, {
          headers: {
            // para pular a mensagem do navegador
            'ngrok-skip-browser-warning': 'true',
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
