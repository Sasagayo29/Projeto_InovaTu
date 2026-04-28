import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../types/partner.interface';
import { environment } from '@/environments/environments.local';

@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getPartners(): Observable<Partner[]> {
        return this.http.get<Partner[]>(`${this.apiUrl}/api/partners`);
    }
    getAll(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/admin/partners`);
    }
    postProposais(name: string, email: string, whatsapp: string, description: string, proposerType: string, recaptchaToken: string): Observable<any> {
        const body = { name, email, whatsapp, description, proposerType, recaptchaToken };
        return this.http.post<any>(`${this.apiUrl}/api/proposals`, body);
    }
    postProposaisResponse(id: number,subject: string,message: string): Observable<any> {
        const body = { subject, message };
        return this.http.post<any>(`${this.apiUrl}/api/admin/proposals/${id}/reply`, body);
    }
    getProposais(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/admin/proposals`);
    }
    postCreateParceiro(name: string, description: string, logoUrl: string, websiteUrl: string, isActive: boolean): Observable<Partner> {
        const body = { name, description, logoUrl, websiteUrl, isActive };
        return this.http.post<Partner>(`${this.apiUrl}/api/admin/partners`, body);
    }
    putUpdateParceiro(idParceiro: number, name: string, description: string, logoUrl: string, websiteUrl: string, isActive: boolean): Observable<Partner> {
        const body = { name, description, logoUrl, websiteUrl, isActive };
        return this.http.put<Partner>(`${this.apiUrl}/api/admin/partners/${idParceiro}`, body);
    }

    deleteParceiro(idParceiro: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/admin/partners/${idParceiro}`);
    }
}
