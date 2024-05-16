import { Routes } from '@angular/router';
import { autenticacaoGuard } from './_services/guards/autenticacao.guard';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

export const routes: Routes = [
  {
    path: 'conta',
    component: MyAccountComponent,
    pathMatch: 'full',
    canActivate: [autenticacaoGuard],
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
];
