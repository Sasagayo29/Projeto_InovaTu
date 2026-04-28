import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';
import { Proposais } from '@/core/types/proposais.interface';
import { PartnerService } from '@/core/service/partner.service';


@Component({
  selector: 'app-propostas',
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, Toast, DialogModule, ConfirmDialogModule, RippleModule,TextareaModule],
  providers: [MessageService],
  template: `<p-toast position="top-center"></p-toast>

<div class="flex items-center justify-center">
    <div class="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">

        <h1 class="text-2xl font-semibold mb-6 text-center">
            Propostas recebidas
        </h1>

        <p-table
            [value]="propostas"
            [loading]="loading"
            [paginator]="true"
            [rows]="10"
            responsiveLayout="scroll"
            *ngIf="propostas.length > 0"
        >
            <ng-template pTemplate="header">
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>whatsapp</th>
                    <th>Tipo de proposta</th>
                    <th>Status</th>
                    <th>Solicitado em:</th>
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
                        {{ item.whatsapp }}
                    </td>
                      <td class="max-w-xs truncate" title="{{ item.subject }}">
                        {{ item.proposerType }}
                    </td>

                    <td>
                        <span
                            class="px-2 py-1 rounded text-white text-xs"
                            [ngClass]="{
                                'bg-yellow-500': item.status === 'NOVO',
                                'bg-green-500': item.status === 'CONTATADO'
                            }"
                        >
                            {{ item.status }}
                        </span>
                    </td>

                    <td class="text-sm text-gray-500">
                        {{ item.createdAt | date:'dd/MM/yyyy  HH:mm' }}
                    </td>
                    <td>
                        <p-button type="submit" disabled="item.status === 'CONTATADO'" (onClick)="responder(item)" >Responder</p-button>
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p
            *ngIf="!loading && propostas.length === 0"
            class="text-center text-gray-500 mt-4"
        >
            Nenhuma proposta encontrada.
        </p>

    </div>
</div>     
            <p-dialog [(visible)]="dialog" header="Respondendo Proposta" [modal]="true" [style]="{ width: '500px' }">
            <div class="space-y-4">
                <label>Descrição da Proposta</label>
                <textarea [(ngModel)]="reposta.description" rows="5" cols="30" fluid pTextarea  disabled="true" class="w-full "></textarea>
                <label>Título</label>
                <input pInputText [(ngModel)]="tituloResposta"  class="w-full" />

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
export class proposais implements OnInit {

    propostas: Proposais[] = [];
    loading = false;
    dialog = false;
    reposta: Proposais | any = {};
    textoResposta: string = '';
    tituloResposta: string = '';
    constructor(
        private partnerService: PartnerService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.listar();
    }

    listar(): void {
        this.loading = true;

        this.partnerService.getProposais().subscribe({
            next: (res) => {
                this.propostas = res;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível carregar as propostas.'
                });
            }
        });
    }
    responder(proposais: Proposais): void {
        this.dialog = true;
        this.reposta = { ...proposais };
    }
    enviarResposta(reposta: Proposais): void {
    this.partnerService.postProposaisResponse(reposta.id,this.tituloResposta,this.textoResposta).subscribe({
                next: (res) => {
                    this.propostas = res;
                    this.loading = false;
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
                        detail: 'Não foi enviar resposta.'
                    });
                }
            });
    }
}
