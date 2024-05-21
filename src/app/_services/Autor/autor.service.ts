import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AutorDTO } from '../../dto/AutorDTO';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { IPaginatedResponse } from '../../dto/IPaginatedResponse';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // lista autores
  public async list(
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<AutorDTO> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}autor`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            // para pular a mensagem do navegador
            'ngrok-skip-browser-warning': 'true',
          },
          params: {
            page: page,
            limit: limit,
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

  // cria um autor
  public async create(aut_Nome: string): Promise<AutorDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(
          `${this.globalService.baseUrl}autor`,
          { aut_Nome },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
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
        return new ErrorDTO('Erro ao chamar createAutor', 500);
      }
    }
  }

  // lista por nome
  public async listByName(
    aut_Nome: string,
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<AutorDTO> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}autor/search`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            // para pular a mensagem do navegador
            'ngrok-skip-browser-warning': 'true',
          },
          params: {
            aut_Nome: aut_Nome,
            page: page,
            limit: limit,
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
