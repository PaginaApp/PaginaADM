import { Routes } from '@angular/router';
import { autenticacaoGuard } from './_services/guards/autenticacao.guard';
import { LivrosComponent } from './components/livros/livros/livros.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RelatorioComponent } from './components/relatorio/relatorio/relatorio.component';
import { TermoComponent } from './components/termo/termo/termo.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'conta',
    component: MyAccountComponent,
    pathMatch: 'full',
    canActivate: [autenticacaoGuard],
  },
  {
    path: 'livros',
    component: LivrosComponent,
    pathMatch: 'full',
    canActivate: [autenticacaoGuard],
  },

  {
    path: 'usuarios',
    component: UsuariosComponent,
    pathMatch: 'full',
    canActivate: [autenticacaoGuard],
  },

  {
    path: 'relatorio',
    component: RelatorioComponent,
    pathMatch: 'full',
    canActivate: [autenticacaoGuard],
  },

  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  {
    path: 'termo',
    component: TermoComponent,
    pathMatch: 'full',
  },

  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [autenticacaoGuard],
  },
];
