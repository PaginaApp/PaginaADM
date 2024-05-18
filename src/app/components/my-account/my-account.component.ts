import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarService } from '../../_services/Avatar/avatar.service';
import { ErrorDTO } from '../../dto/ErrorDTO';
import { HeaderComponent } from '../header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [HeaderComponent, PasswordComponent, NgIf, LogoutComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit {
  constructor(private avatarService: AvatarService, private router: Router) {}

  public avatar: string = '';
  // pega o nome do usuario e email na sessão
  public nome: string = JSON.parse(sessionStorage.getItem('user')!).usu_Nome;
  public email: string = JSON.parse(sessionStorage.getItem('user')!).usu_Email;

  // controle de modal
  public isChangePasswordModalOpen: boolean = false;
  public isLogoutModalOpen: boolean = false;

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

  public openModal(): void {
    this.isChangePasswordModalOpen = true;
  }

  public closeModal(): void {
    this.isChangePasswordModalOpen = false;
    this.isLogoutModalOpen = false;
  }

  public openLogoutModal(): void {
    this.isLogoutModalOpen = true;
  }
}
