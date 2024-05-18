import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../_services/user/user.service';
import { ErrorDTO } from '../../../dto/ErrorDTO';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
})
export class PasswordComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  public passwordForm: FormGroup;
  public error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public async changePassword(): Promise<void> {
    if (!this.passwordForm.valid) {
      this.error = 'Campos inválidos, verifique os dados e tente novamente.';
      return;
    }

    const password = this.passwordForm.get('password')!.value;
    const newPassword = this.passwordForm.get('newPassword')!.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')!.value;

    if (newPassword !== confirmPassword) {
      this.error = 'As senhas não coincidem.';
      return;
    }

    try {
      const resposta = await this.userService.changePassword(
        password,
        newPassword
      );

      if (resposta instanceof ErrorDTO) {
        this.error = resposta.message;
        return;
      }

      window.alert('Senha alterada com sucesso.');
      this.close();
    } catch (error) {
      this.error = 'Erro ao alterar a senha, tente novamente.';
    }
  }

  public close(): void {
    this.closeModalEvent.emit();
  }
}
