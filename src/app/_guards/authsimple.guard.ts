import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthenticationService, AuthenticationServiceSimple} from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuardSimple implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationServiceSimple
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        this.authenticationService.setSubject(currentUser);
        if (currentUser) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login-page']);
        return false;
    }
}
