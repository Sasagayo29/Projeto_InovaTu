import { environment } from '@/environments/environments.local';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';
import { Token } from '../types/token.interface';

@Injectable({
    providedIn: 'root'
})
export class authUserService {
    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<Token> {
        const body={email,password };
        return this.http.post<Token>(`${this.API_URL}/auth/login`,body);
    }

}