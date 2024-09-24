import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/api/auth.service";
import {Injectable} from "@angular/core";
import {Observable, of, switchMap} from "rxjs";

@Injectable()
export class AuthRequiredGuard implements CanActivate {

    constructor(private authService: AuthService,
                public router: Router,
                private route: ActivatedRoute,) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return of(null)
            .pipe(switchMap((w) => {
                if(this.authService.isAuthenticated()) {
                    return of(true);
                } else {
                    this.router.navigate(['sign', 'in']).then();

                    return of(false);
                }
            }));
    }
}
