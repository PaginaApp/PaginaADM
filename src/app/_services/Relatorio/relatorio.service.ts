import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { RelatorioCatMesDTO } from '../../dto/RelatorioCatMesDTO';
import { RelatorioExemplarMesDTO } from '../../dto/RelatorioExemplarMesDTO';
import { RelatorioIdadeDTO } from '../../dto/RelatorioIdadeDTO';
import { RelatorioTransacaoMesDTO } from '../../dto/RelatorioTransacaoMesDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // relatório de usuário por idade
  async relatorioIdade(): Promise<RelatorioIdadeDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}relatorio/users/idade`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
              // para pular a mensagem do navegador
              'ngrok-skip-browser-warning': 'true',
            },
          }
        )
      );
      const data = new RelatorioIdadeDTO({
        till_30: response.data.till_30,
        btwn_30_50: response.data.btwn_30_50,
        over_50: response.data.over_50,
      });

      console.log(data, 'teste');
      return data;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar listUsers', 500);
      }
    }
  }

  // relatório de exemplares cadastrados por mês
  async relatorioExemplarMes(
    ano: Number
  ): Promise<RelatorioExemplarMesDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}relatorio/exemplares/${ano}`,
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
        return new ErrorDTO('Erro ao chamar listUsers', 500);
      }
    }
  }

  // relatorio transacoes realizadas mes
  async relatorioTransacoesMes(
    ano: Number
  ): Promise<RelatorioTransacaoMesDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}relatorio/transacoes/${ano}`,
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
        return new ErrorDTO('Erro ao chamar listUsers', 500);
      }
    }
  }

  // relatorio cat por mes
  async relatorioCatMes(ano: Number): Promise<RelatorioCatMesDTO | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}relatorio/categorias/${ano}`,
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
        return new ErrorDTO('Erro ao chamar listUsers', 500);
      }
    }
  }
}
