import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../loguin/login.service';

export const autenticacaoGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (sessionStorage.getItem('accessToken')) {
    const isLoged = await loginService.verifyToken(
      sessionStorage.getItem('accessToken')!,
      JSON.parse(sessionStorage.getItem('user')!).usu_Id
    );

    if (isLoged === true) {
      return true;
    } else {
      // Se o token não for válido, redirecione para a página de login
      console.log('Token inválido');
      await router.navigate(['/login']);
      return false;
    }
  } else {
    console.log('Token não encontrado');
    await router.navigate(['/login']);
    return false;
  }
};
