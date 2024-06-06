import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public baseUrl: string = environment.BASE_URL;

  public verifyToken(): boolean {
    return (
      sessionStorage.getItem('accessToken') !== null &&
      sessionStorage.getItem('user') !== null
    );
  }
}
