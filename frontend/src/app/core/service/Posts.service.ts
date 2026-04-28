import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Postar } from '../types/post.interface';
import { environment } from '@/environments/environments.local';

const API_BASE_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class PostagensService {
    private http = inject(HttpClient);
    private API_BASE_URL = environment.apiUrl;

    getPosts(): Observable<any> {
        return this.http.get(`${this.API_BASE_URL}/api/admin/posts/my-posts`);
    }

    getPostsPublicNoticias(Qtd_Noticia: number): Observable<any> {
        return this.http.get(`${this.API_BASE_URL}/api/posts/recent/news?limit=${Qtd_Noticia}`);
    }
    getPostsPublicEventos(Qtd_Noticia: number): Observable<any> {
        return this.http.get(`${this.API_BASE_URL}/api/posts/recent/events?limit=${Qtd_Noticia}`);
    }

    // //Retorna uma postagem específica pelo ID.
    // getPostById(id: number): Observable<Post> {
    //     return this.http.get<Post>(`${this.API_BASE_URL}/${id}`);
    // }

    // //Retorna todas as postagens de um administrador específico.
    // getPostsByAdmin(adminId: number): Observable<Post[]> {
    //     return this.http.get<Post[]>(`${this.API_BASE_URL}/by-admin/${adminId}`);
    // }

    postCreatePostagem(data: any): Observable<any> {
        return this.http.post<any>(`${this.API_BASE_URL}/api/admin/posts`, data);
    }

    putUpdate(id: number, data: any): Observable<any> {
        return this.http.put<any>(`${this.API_BASE_URL}/api/admin/posts/${id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_BASE_URL}/api/admin/posts/${id}`);
    }
}
