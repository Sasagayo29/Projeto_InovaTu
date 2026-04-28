import { environment } from '@/environments/environments.local';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';
import { Token } from '../types/token.interface';
import { Room } from '../types/room.interface';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    postCriarRoom(body: Room): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/api/admin/rooms`, body);
    }
    getAllRoom(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/admin/rooms`);
    }

    getPublicAllRoom(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/rooms`);
    }
    putRoom(idSala: number, body: Room): Observable<any> {
        console.log(body);
        return this.http.put(`${this.API_URL}/api/admin/rooms/${idSala}`, body);
    }
    delete(idSala: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/api/admin/rooms/${idSala}`);
    }
}
