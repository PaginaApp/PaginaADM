import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EditoraDTO } from '../../dto/EditoraDTO';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { IPaginatedResponse } from '../../dto/IPaginatedResponse';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class EditoraService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // lista editoras
  public async list(
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<EditoraDTO> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}editora`, {
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

  // cria uma editora
  public async create(edi_Nome: string): Promise<EditoraDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(
          `${this.globalService.baseUrl}editora`,
          { edi_Nome },
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
        return new ErrorDTO('Erro ao chamar createEditora', 500);
      }
    }
  }

  // lista editoras por nome
  public async listByName(
    edi_Nome: string,
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<EditoraDTO> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}editora/search`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            // para pular a mensagem do navegador
            'ngrok-skip-browser-warning': 'true',
          },
          params: {
            edi_Nome: edi_Nome,
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
        return new ErrorDTO('Erro ao chamar listEditoraByName', 500);
      }
    }
  }
}
