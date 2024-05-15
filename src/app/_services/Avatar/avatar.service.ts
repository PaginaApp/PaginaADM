import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  async getAvatar(usu_Id: string): Promise<string | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}users/${usu_Id}/avatar`,
          {
            headers: {
              //Authorization: `Bearer ${this.globalService.accessToken}`,
              // para pular a mensagem do navegador
              'ngrok-skip-browser-warning': 'true',
            },
            // recebe a imagem como png
            responseType: 'blob' as 'json',
          }
        )
      );

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(response);
      });
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro ao chamar getAvatar', 500);
      }
    }
  }

  //
}
