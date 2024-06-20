import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { TermoDTO } from '../../dto/TermoDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class TermoService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  async getActualTermo(): Promise<TermoDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}termo/`, {
          headers: {
            //Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar getActualTermo', 500);
      }
    }
  }

  async createTermo(
    tpr_Texto: string,
    user_Id: string
  ): Promise<TermoDTO | ErrorDTO> {
    try {
      const body = {
        tpr_Texto: tpr_Texto,
        tpr_usu_id: user_Id,
      };

      const response = await firstValueFrom(
        this.http.post<any>(`${this.globalService.baseUrl}termo/`, body, {
          headers: {
            //Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'ngrok-skip-browser-warning': 'true',
          },
        })
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar createTermo', 500);
      }
    }
  }
}
