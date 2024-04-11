import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';
import { UserAuthProfil } from '../../types/users';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private userDataService: UserDataService) { }
    token!: string;

    
    

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.userDataService.userAuthData$.subscribe((data: UserAuthProfil) => {
            this.token = data.userToken;
        })

        console.log(this.token);
        

        // Ако токенът е наличен, добавяме го към Authorization header
        if (this.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.token}`
                }
            });
        }

        // Изпращаме модифицираната заявка към следващия интерсептор или към сървъра
        console.log(request);
            console.log('added token');
            
        return next.handle(request);
    }
}
