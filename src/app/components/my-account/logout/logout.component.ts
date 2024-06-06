import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../_services/global.service';
import { LoginService } from '../../../_services/loguin/login.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private loginService: LoginService
  ) {}

  @Output() closeModalEvent = new EventEmitter<void>();

  cancel() {
    this.closeModalEvent.emit();
  }

  async logout() {
    if (!this.globalService.verifyToken()) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(sessionStorage.getItem('user')!);
    const accessToken = sessionStorage.getItem('accessToken')!;

    try {
      const resposta = await this.loginService.logout(user.usu_Id, accessToken);

      if (resposta instanceof ErrorDTO) {
        window.alert(resposta.message);
      } else {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      window.alert('Erro ao chamar logout');
    }
  }
}
