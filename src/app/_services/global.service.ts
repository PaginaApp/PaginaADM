import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public baseUrl: string = environment.BASE_URL;
}
