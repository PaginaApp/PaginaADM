import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

export const routes: Routes = [
  { path: 'conta', component: MyAccountComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
];
