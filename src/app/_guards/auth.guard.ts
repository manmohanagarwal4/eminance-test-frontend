import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService: UserService = inject(UserService);
  const router: Router = inject(Router);
  return authService.getAuth().pipe(
    map((status) => {
      if (status) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
};
