import { Routes } from '@angular/router';
import { MyAccountComponent } from './components/my-account/my-account.component';

export const routes: Routes = [
  { path: 'conta', component: MyAccountComponent, pathMatch: 'full' },
];
