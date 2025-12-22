import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { map, take} from 'rxjs';

export const authGuard: CanActivateFn  & CanMatchFn = ()  => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map(user => (user ? true : router.createUrlTree(['/login'])))
  );
};
