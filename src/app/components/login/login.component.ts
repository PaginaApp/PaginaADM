import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../_services/loguin/login.service';
import { ErrorDTO } from '../../dto/ErrorDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      senha: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe((value) => {
      this.error = undefined;
    });
  }

  public async login(): Promise<void> {
    if (!this.loginForm.valid) {
      this.error = 'Campos inválidos, verifique os dados e tente novamente.';
      return;
    }

    // faz o login com os dados do formulário
    const email = this.loginForm.get('email')?.value;
    const senha = this.loginForm.get('senha')?.value;

    try {
      const response = await this.loginService.createSession(email, senha);

      if (response instanceof ErrorDTO) {
        this.error = response.message;
        return;
      }

      // login bem-sucedido
      // salva o token de acesso e o usuário na sessão
      sessionStorage.setItem('accessToken', response.accessToken);
      sessionStorage.setItem('user', JSON.stringify(response.user));

      // redireciona para a página inicial
      this.router.navigate(['/conta']);
    } catch (error) {
      console.error('Erro ao chamar createSession', error);
      this.error = 'Erro ao chamar createSession';
    }
  }
}
