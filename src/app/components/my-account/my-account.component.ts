import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from '../../_services/Avatar/avatar.service';
import { GlobalService } from '../../_services/global.service';
import { LoginService } from '../../_services/loguin/login.service';
import { UserService } from '../../_services/user/user.service';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit {
  constructor(
    private avatarService: AvatarService,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,
    private globalService: GlobalService
  ) {}

  public avatar: string = '';

  async ngOnInit(): Promise<void> {
    // seta o avatar do usuário
    await this.setAvatar();
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.avatar = reader.result as string;
        this.newAvatar(this.avatar.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  }

  private async newAvatar(avatar: string): Promise<void> {
    if (sessionStorage.getItem('user') === null) {
      this.router.navigate(['/login']);
      return;
    }
    let user = JSON.parse(sessionStorage.getItem('user')!);

    try {
      const resposta = await this.avatarService.setAvatar(
        user.usu_Id.toString(),
        avatar
      );

      if (resposta instanceof ErrorDTO) {
        window.alert(resposta.message);
      } else {
        // resposta não contém nada, então o avatar foi alterado com sucesso e deve ser atualizado na tela
        this.setAvatar();
      }
    } catch (error) {
      window.alert('Erro ao chamar setAvatar');
    }
  }

  private async setAvatar(): Promise<void> {
    if (sessionStorage.getItem('user') === null) {
      this.router.navigate(['/login']);
      return;
    }
    let user = JSON.parse(sessionStorage.getItem('user')!);

    try {
      const resposta = await this.avatarService.getAvatar(
        user.usu_Id.toString()
      );

      if (resposta instanceof ErrorDTO) {
        window.alert(resposta.message);
      } else {
        this.avatar = resposta;
      }
    } catch (error) {
      window.alert('Erro ao chamar getAvatar');
    }
  }

  public async logout(): Promise<void> {
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
