import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from '../../_services/Avatar/avatar.service';
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
  constructor(private avatarService: AvatarService, private router: Router) {}

  public avatar: string = '';

  async ngOnInit(): Promise<void> {
    // seta o avatar do usuário
    await this.setAvatar();
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
}
