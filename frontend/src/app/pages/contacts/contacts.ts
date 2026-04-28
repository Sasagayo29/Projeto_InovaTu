import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Contact } from '@/core/types/contact.interface';
import { ContactService } from '@/core/service/contact.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'app-contacts',
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, Toast, DialogModule, ConfirmDialogModule, RippleModule,TextareaModule],
  providers: [MessageService],
  template: `<p-toast position="top-center"></p-toast>

<div class="flex items-center justify-center">
    <div class="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">

        <h1 class="text-2xl font-semibold mb-6 text-center">
            Contatos recebidos
        </h1>

        <p-table
            [value]="contacts"
            [loading]="loading"
            [paginator]="true"
            [rows]="10"
            responsiveLayout="scroll"
            *ngIf="contacts.length > 0"
        >
            <ng-template pTemplate="header">
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Assunto</th>
                    <th>Status</th>
                    <th>Recebido</th>
                    <th>Responder</th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-item>
                <tr>
                    <td>{{ item.id }}</td>

                    <td class="font-medium">
                        {{ item.name }}
                    </td>

                    <td class="text-sm text-gray-600">
                        {{ item.email }}
                    </td>

                    <td class="max-w-xs truncate" title="{{ item.subject }}">
                        {{ item.subject }}
                    </td>

                    <td>
                       <span
                            class="px-2 py-1 rounded text-white text-xs"
                            [ngClass]="{
                                'bg-yellow-500': item.status === 'NOVO',
                                'bg-green-500': item.status === 'LIDO',
                            }"
                        >
                            {{ item.status }}
                        </span>
                    </td>
                    <td class="text-sm text-gray-500">
                        {{ item.createdAt | date:'dd/MM/yyyy HH:mm' }}
                    </td>
                    <td>
                        <p-button type="submit" [disabled]="item.status === 'LIDO'" (onClick)="responder(item)" >Responder</p-button>
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p
            *ngIf="!loading && contacts.length === 0"
            class="text-center text-gray-500 mt-4"
        >
            Nenhum contato encontrado.
        </p>

    </div>
</div>     
            <p-dialog [(visible)]="dialog" header="Respondendo Dúvida" [modal]="true" [style]="{ width: '500px' }">
            <div class="space-y-4">
                <label>Título</label>
                <input pInputText [(ngModel)]="reposta.subject" [disabled]="true" class="w-full" />

                <label>Dúvida:</label>
                <textarea [(ngModel)]="reposta.message" rows="5"cols="30"  fluid pTextarea [disabled]="true"></textarea>

                <label>Resposta:</label>
                <textarea [(ngModel)]="textoResposta" rows="5" cols="30" fluid pTextarea class="w-full "></textarea>
            </div>

            <ng-template pTemplate="footer">
                <p-button label="Enviar" (onClick)="enviarResposta(reposta)"></p-button>
                <p-button label="Cancelar" severity="secondary" (onClick)="dialog = false"></p-button>
            </ng-template>
        </p-dialog>

    
`
})
export class Contacts implements OnInit {

    contacts: Contact[] = [];
    loading = false;
    dialog = false;
    reposta: Contact | any = {};
    textoResposta: string = '';
    constructor(
        private contactService: ContactService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.listar();
    }

    listar(): void {
        this.loading = true;

        this.contactService.getContacts().subscribe({
            next: (res) => {
                this.contacts = res;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível carregar os contatos.'
                });
            }
        });
    }
    responder(contact: Contact): void {
        this.dialog = true;
        this.reposta = { ...contact };
    }
    enviarResposta(reposta: Contact) {
    this.contactService.postContactsResponse(reposta.id,reposta.subject,this.textoResposta).subscribe({
                next: (res) => {
                    // this.propostas = res;
                    // this.loading = false;
                    this.messageService.add({
                        severity: 'sucesso',
                        summary: 'sucesso',
                        detail: 'Email Enviado com Sucesso.'
                    });
                     this.dialog = false;
                },
                error: () => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'falha ao enviar o email.'
                    });
                }
            });
    }
    
}
