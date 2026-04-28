import { Empty } from './../empty/empty';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { Postar } from '@/core/types/post.interface';
import { PostagensService } from '@/core/service/Posts.service';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-postagens',
    standalone: true,
    imports: [EditorModule, CommonModule, FormsModule, ToastModule, ButtonModule, InputTextModule, TableModule, ConfirmDialogModule, DialogModule, TextareaModule, SelectModule],
    providers: [MessageService, ConfirmationService],
    template: `
        <p-toast position="top-center"></p-toast>
        <p-confirmDialog></p-confirmDialog>

        <div class="flex items-center justify-center">
            <div class="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
                <h1 class="text-2xl font-semibold mb-4 text-center">Gerenciar Postagens</h1>
                <form #f="ngForm" (ngSubmit)="criarPost(f)" class="space-y-4">
                    <div>
                        <label class="block text-sm mb-1">Título</label>
                        <input pInputText [(ngModel)]="title" name="title" required class="w-full rounded-md border px-3 py-2" />
                    </div>

                    <div>
                        <label class="block text-sm mb-1">Imagem Url</label>
                        <input pInputText [(ngModel)]="imageUrls" placeholder="https://example.com/logo.png" name="Url da Imagem" required class="w-full rounded-md border px-3 py-2" />
                    </div>

                    <div>
                        <label class="block text-sm mb-1">Local do Evento</label>
                        <input pInputText [(ngModel)]="local" name="title" placeholder="Preencha somente no caso de ser um evento" class="w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                        <label class="block text-sm mb-1">Tipo de Postagem</label>
                        <p-select [(ngModel)]="postType" name="postType" [options]="tiposPost" required fluid>
                        </p-select>
                    </div>
                    <div>
                        <label class="block text-sm mb-1">Conteúdo</label>
                        
                        
                        <p-editor name="content" [(ngModel)]="content" required [style]="{ height: '320px' }">
                            <ng-template #header>
                                <span class="ql-formats">
                                    <select class="ql-header">
                                        <option selected></option>
                                        <option value="1"></option>
                                        <option value="2"></option>
                                    </select>
                                    <select class="ql-font">
                                        <option selected></option>
                                        <option value="serif"></option>
                                        <option value="monospace"></option>
                                    </select>
                                    <button class="ql-bold"></button>
                                    <button class="ql-italic"></button>
                                    <button class="ql-underline"></button>
                                    <select class="ql-color"></select>
                                    <select class="ql-background"></select>
                                    <button class="ql-list" value="ordered"></button>
                                    <button class="ql-list" value="bullet"></button>
                                    <select class="ql-align"></select>
                                </span>
                            </ng-template>
                        </p-editor> 
                        <!-- <textarea [(ngModel)]="content" pTextarea name="content" rows="5" required class="w-full rounded-md  px-3 py-2"></textarea> -->
                    </div>

                    <p-button label="Criar Post" type="submit" [loading]="loading" styleClass="w-full"></p-button>
                </form>
                <h2 class="text-xl font-semibold mt-10 mb-3 text-center">Postagens cadastradas</h2>

                <p-table [value]="posts" [paginator]="true" [rows]="5">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Tipo</th>
                            <th>Criado em</th>
                            <th>Ações</th>
                        </tr>
                    </ng-template>

                    <ng-template pTemplate="body" let-post>
                        <tr>
                            <td>{{ post.id }}</td>
                            <td>{{ post.title }}</td>
                            <td>{{ post.postType }}</td>
                            <td>{{ post.createdAt | date: 'dd/MM/yyyy HH:mm' }}</td>

                            <td class="flex gap-2">
                                <p-button icon="pi pi-pencil" severity="info" [rounded]="true" [text]="true" (onClick)="editar(post)"> </p-button>

                                <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [text]="true" (onClick)="excluir(post)"> </p-button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
        <p-dialog [(visible)]="dialog" header="Editar Postagem" [modal]="true" [style]="{ width: '500px' }">
            <div class="space-y-4">
                <label>Título</label>
                <input pInputText [(ngModel)]="postEdit.title" class="w-full" />

                <div *ngIf="postEdit.local">
                    <label>Local</label>
                    <input pInputText [(ngModel)]="postEdit.local" class="w-full" />
                </div>
                <label>Url Imagem</label>
                <input pInputText  [(ngModel)]="postEdit.imageUrls" class="w-full" />
                <label>Tipo</label>

                <select [(ngModel)]="postEdit.postType" class="w-full rounded-md border px-3 py-2">
                    <option *ngFor="let item of tiposPost" [value]="item.value">
                        {{ item.label }}
                    </option>
                </select>
                <label>Conteúdo</label>
                <p-editor name="postEdit.content" [(ngModel)]="postEdit.content" required [style]="{ height: '320px' }">
                            <ng-template #header>
                                <span class="ql-formats">
                                    <select class="ql-header">
                                        <option selected></option>
                                        <option value="1"></option>
                                        <option value="2"></option>
                                    </select>
                                    <select class="ql-font">
                                        <option selected></option>
                                        <option value="serif"></option>
                                        <option value="monospace"></option>
                                    </select>
                                    <button class="ql-bold"></button>
                                    <button class="ql-italic"></button>
                                    <button class="ql-underline"></button>
                                    <select class="ql-color"></select>
                                    <select class="ql-background"></select>
                                    <button class="ql-list" value="ordered"></button>
                                    <button class="ql-list" value="bullet"></button>
                                    <select class="ql-align"></select>
                                </span>
                            </ng-template>
                        </p-editor> 
                <!-- <textarea [(ngModel)]="postEdit.content" rows="5" cols="30" pTextarea class="w-full "></textarea> -->
            </div>
            <ng-template pTemplate="footer">
                <p-button label="Salvar" (onClick)="salvarEdicao(postEdit)"></p-button>
                <p-button label="Cancelar" severity="secondary" (onClick)="dialog = false"></p-button>
            </ng-template>
        </p-dialog>
    `
})
export class Postagens implements OnInit {
    posts: Postar[] = [];
    postEdit: Postar | any = {};
    title = '';
    content: string = '';
    postType = '';
    imageUrls = '';
    local = '';
    dialog = false;
    loading = false;

    tiposPost = [
        { label: 'Notícia', value: 'NOTICIA' },
        { label: 'Evento', value: 'EVENTO' },
        { label: 'Anúcio', value: 'ANUNCIO' }
    ];

    constructor(
        private postagensService: PostagensService,
        private message: MessageService,
        private confirm: ConfirmationService
    ) {}

    ngOnInit() {
        this.listar();
    }

    listar() {
        this.postagensService.getPosts().subscribe({
            next: (res) => (this.posts = res),
            error: () =>
                this.message.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar postagens'
                })
        });
    }

    criarPost(form: any) {
        if (!form.valid) {
            this.message.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha todos os campos.'
            });
            return;
        }

        this.loading = true;

        const body = {
            title: this.title,
            content: this.content,
            postType: this.postType,
            local: this.local?.trim() || null,
            imageUrls: [this.imageUrls]
        };

        this.postagensService.postCreatePostagem(body).subscribe({
            next: () => {
                this.message.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Post criado.'
                });
                this.loading = false;
                this.listar();
                form.resetForm();
            },
            error: () => {
                this.loading = false;
                this.message.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao criar post.'
                });
            }
        });
    }

    editar(post: Postar) {
        this.postEdit = { ...post };
        this.dialog = true;
    }

    salvarEdicao(post: Postar) {
        const body = {
            title: post.title,
            content: post.content,
            postType: post.postType,
            local: post.local?.trim() || null,
            imageUrls: post.imageUrls
        };
        this.postagensService.putUpdate(post.id, body).subscribe({
            next: () => {
                this.message.add({
                    severity: 'success',
                    summary: 'Atualizado',
                    detail: 'Post atualizado.'
                });
                this.dialog = false;
                this.listar();
            }
        });
    }

    excluir(post: Postar) {
        this.confirm.confirm({
            header: 'Confirmação',
            message: `Deseja excluir "${post.title}"?`,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.postagensService.delete(post.id).subscribe({
                    next: () => {
                        this.message.add({
                            severity: 'success',
                            summary: 'Removido',
                            detail: 'Post excluído.'
                        });
                        this.listar();
                    }
                });
            }
        });
    }
}
