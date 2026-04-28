import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../types/booking.interface';
import { environment } from '@/environments/environments.local';
import { formatLocalDateTime } from '@/core/utils/global.utils';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private http = inject(HttpClient);
    private API_BASE_URL = `${environment.apiUrl}/api/admin/bookings`;
    private API_BASE_URL_PUBLIC = `${environment.apiUrl}/api/bookings`;

    createBooking(request: any): Observable<any> {
        return this.http.post(this.API_BASE_URL_PUBLIC, request);
    }

    getAll(filters?: { status?: string | null; roomId?: number | null; date?: string | null }): Observable<Booking[]> {
        let params = new HttpParams();

        if (filters?.status) {
            params = params.set('status', filters.status);
        }

        if (filters?.roomId !== null && filters?.roomId !== undefined) {
            params = params.set('roomId', String(filters.roomId));
        }

        if (filters?.date) {
            params = params.set('date', filters.date);
        }

        return this.http.get<Booking[]>(this.API_BASE_URL, { params });
    }

    getPublicAllRoomData(dataInicio: Date, dataFim: Date): Observable<any> {
        const inicio = new Date(dataInicio);
        inicio.setHours(8, 0, 0, 0);

        const fim = new Date(dataFim);
        fim.setHours(18, 0, 0, 0);

        const start = formatLocalDateTime(inicio);
        const end = formatLocalDateTime(fim);

        return this.http.get<any>(`${this.API_BASE_URL_PUBLIC}/availability?start=${start}&end=${end}`);
    }

    getById(id: number): Observable<Booking> {
        return this.http.get<Booking>(`${this.API_BASE_URL}/${id}`);
    }
    approve(id: number): Observable<any> {
        return this.http.post<any>(`${this.API_BASE_URL}/${id}/approve`, {});
    }
    reject(id: number, reason: string): Observable<any> {
        const body = { reason };
        return this.http.post<any>(`${this.API_BASE_URL}/${id}/reject`, body);
    }
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_BASE_URL}/${id}`);
    }
}
