// src/app/core/service/contact.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, ContactSubmission } from '../types/contact.interface';
import { environment } from '@/environments/environments.local';

// URL base da API

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    API_BASE_URL = environment.apiUrl;
    private http = inject(HttpClient);

    postSubmitContact(submission: ContactSubmission): Observable<any> {
        return this.http.post(`${this.API_BASE_URL}/api/contact`, submission);
    }

    getContacts(): Observable<any> {
        return this.http.get(`${this.API_BASE_URL}/api/admin/contacts`);
    }

    postContactsResponse(id: number, subject: string, message: string): Observable<any> {
        const body = { subject, message };
        return this.http.post<any>(`${this.API_BASE_URL}/api/admin/contacts/${id}/reply`, body);
    }
}
