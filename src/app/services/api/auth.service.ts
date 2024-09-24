import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import { AuthModel, RegisterModel } from 'src/app/shared/models/auth-models';
import { jwtDecode } from 'jwt-decode';

export const ACCESS_TOKEN_KEY = 'apexi_bee_access_token'

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        @Inject('API_URL') private apiUrl: string,
        private jwtHelper: JwtHelperService,
        private router: Router,
        private route: ActivatedRoute
    ) 
    { }

    register(registerInfo: RegisterModel): Observable<any> {
        return this.http.post(`${this.apiUrl}api/Auth/register`, registerInfo);
    }

    login(authInfo: AuthModel): Observable<any> {
        return this.http.post(`${this.apiUrl}api/Auth/login`, authInfo)
            .pipe(tap((res: any) => {
                localStorage.setItem(ACCESS_TOKEN_KEY, res.token);
            }))
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        return !this.jwtHelper.isTokenExpired(token);
    }

    isCurrentUserClient() : boolean {
        if(this.getUserInfoFromToken().role.toLowerCase().includes("client")) {
            return true;
        }
        return false;
    }

    isCurrentUserAdmin() : boolean {
        if(this.getUserInfoFromToken().role.toLowerCase().includes("admin")) {
            return true;
        }
        return false;
    }

    isCurrentUserManager() : boolean {
        if(this.getUserInfoFromToken().role.toLowerCase().includes("manager")) {
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        this.router.navigate(['sign', 'in'], { relativeTo: this.route }).then();
    }

    getUserInfoFromToken(): any {
        const jwtToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const tokenInfo = this.getDecodedAccessToken(jwtToken!);
        return {
            username: tokenInfo.unique_name,
            credentialsId: tokenInfo.credentialsId,
            accountId: tokenInfo.accountId,
            role: tokenInfo.role
        };
    }
    
    getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }
}
