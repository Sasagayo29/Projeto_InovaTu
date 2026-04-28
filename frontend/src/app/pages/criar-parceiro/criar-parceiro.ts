import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { Partner } from '@/core/types/partner.interface';
import { Component } from '@angular/core';
import { PartnerService } from '@/core/service/partner.service';

@Component({
    selector: 'app-criar-parceiro',
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, Toast, DialogModule, ConfirmDialogModule, RippleModule],
    providers: [MessageService, ConfirmationService],
    template: `
        <p-toast position="top-center"></p-toast>
        <p-confirmDialog></p-confirmDialog>

        <div class="flex items-center justify-center">
            <div class="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
                <h1 class="text-2xl font-semibold mb-6 text-center">Gerenciamento de Parceiros</h1>
                <form #form="ngForm" (ngSubmit)="criarParceiro(form)" class="space-y-4">
                    <div>
                        <label class="block text-sm mb-1">Nome *</label>
                        <input pInputText class="w-full border rounded px-3 py-2" placeholder="Nome da empresa" name="name" [(ngModel)]="name" required />
                    </div>

                    <div>
                        <label class="block text-sm mb-1">Descrição</label>
                        <input pInputText class="w-full border rounded px-3 py-2" placeholder="Descrição" name="description" [(ngModel)]="description" />
                    </div>

                    <div>
                        <label class="block text-sm mb-1">Logo URL</label>
                        <input pInputText class="w-full border rounded px-3 py-2" placeholder="https://example.com/logo.png" name="logoUrl" [(ngModel)]="logoUrl" (blur)="validarUrl('logo')" />
                    </div>

                    <div>
                        <label class="block text-sm mb-1">Website</label>
                        <input pInputText class="w-full border rounded px-3 py-2" placeholder="https://empresa.com" name="websiteUrl" [(ngModel)]="websiteUrl" (blur)="validarUrl('website')" />
                    </div>

                    <div class="flex items-center gap-2">
                        <label>Ativo:</label>
                        <input type="checkbox" [(ngModel)]="isActive" name="isActive" />
                    </div>

                    <p-button label="Cadastrar" styleClass="w-full" type="submit" [loading]="loading"></p-button>
                </form>

                <hr class="my-8" />

                <h2 class="text-xl font-semibold mb-4 text-center">Parceiros cadastrados</h2>
                <p-table [value]="partners" [paginator]="true" [rows]="5" *ngIf="partners.length > 0">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Website</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </ng-template>

                    <ng-template pTemplate="body" let-item>
                        <tr>
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.websiteUrl || '-' }}</td>
                            <td>
                                <span class="px-2 py-1 rounded text-white" [ngClass]="item.isActive ? 'bg-green-500' : 'bg-gray-400'">
                                    {{ item.isActive ? 'Ativo' : 'Inativo' }}
                                </span>
                            </td>

                            <td class="flex gap-2">
                                <p-button icon="pi pi-pencil" severity="info" rounded text (click)="editar(item)" />
                                <p-button icon="pi pi-trash" severity="danger" rounded text (click)="excluir(item)" />
                            </td>
                        </tr>
                    </ng-template>
                </p-table>

                <p *ngIf="partners.length == 0" class="text-center text-gray-500 mt-4">Nenhum parceiro encontrado.</p>
            </div>
        </div>
        <p-dialog [(visible)]="dialog" header="Editar parceiro" [modal]="true" [style]="{ width: '400px' }">
            <div class="space-y-4">
                <label>ID</label>
                <input pInputText class="w-full" [(ngModel)]="partner.id" disabled />

                <label>Nome *</label>
                <input pInputText class="w-full" [(ngModel)]="partner.name" />

                <label>Descrição</label>
                <input pInputText class="w-full" [(ngModel)]="partner.description" />

                <label>Logo URL</label>
                <input pInputText class="w-full" [(ngModel)]="partner.logoUrl" (blur)="validarUrl('logoEdit')" />

                <label>Website</label>
                <input pInputText class="w-full" [(ngModel)]="partner.websiteUrl" (blur)="validarUrl('websiteEdit')" />

                <div class="flex items-center gap-2">
                    <label>Ativo:</label>
                    <input type="checkbox" [(ngModel)]="partner.isActive" />
                </div>
            </div>

            <ng-template pTemplate="footer">
                <p-button label="Salvar" (click)="salvar()" />
                <p-button label="Cancelar" severity="secondary" (click)="dialog = false" />
            </ng-template>
        </p-dialog>
    `
})
export class CriarParceiro {
    partners: Partner[] = [];
    partner: Partner = {
        id: 0,
        name: '',
        description: '',
        logoUrl: '',
        websiteUrl: '',
        isActive: true
    };

    name = '';
    description = '';
    logoUrl = '';
    websiteUrl = '';
    isActive = true;

    loading = false;
    dialog = false;

    constructor(
        private partnersService: PartnerService,
        private message: MessageService,
        private confirm: ConfirmationService
    ) {}

    ngOnInit() {
        this.listar();
    }

    listar() {
        this.partnersService.getAll().subscribe({
            next: (res: any) => (this.partners = res),
            error: () => this.message.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os parceiros.' })
        });
    }

    criarParceiro(form: any) {
        if (!form.valid) {
            this.message.add({ severity: 'error', summary: 'Erro', detail: 'Preencha o nome corretamente.' });
            return;
        }
        if (!this.validarCampos()) return;
        this.loading = true;
        this.partnersService.postCreateParceiro(this.name, this.description, this.logoUrl, this.websiteUrl, this.isActive).subscribe({
            next: () => {
                this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Parceiro cadastrado.' });
                this.loading = false;
                this.resetar();
                this.listar();
            },
            error: () => {
                this.loading = false;
                this.message.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao cadastrar.' });
            }
        });
    }

    editar(p: Partner) {
        this.partner = { ...p };
        this.dialog = true;
    }

    salvar() {
        if (!this.partner.name) {
            this.message.add({ severity: 'error', summary: 'Erro', detail: 'Nome é obrigatório.' });
            return;
        }

        this.partnersService.putUpdateParceiro(this.partner.id!, this.partner.name, this.partner.description, this.partner.logoUrl, this.partner.websiteUrl, this.partner.isActive).subscribe({
            next: () => {
                this.message.add({ severity: 'success', summary: 'Atualizado', detail: 'Parceiro atualizado com sucesso.' });
                this.dialog = false;
                this.listar();
            }
        });
    }

    excluir(p: Partner) {
        this.confirm.confirm({
            message: `Remover ${p.name}?`,
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.partnersService.deleteParceiro(p.id!).subscribe({
                    next: () => {
                        this.message.add({ severity: 'success', summary: 'Removido', detail: 'Parceiro excluído.' });
                        this.listar();
                    }
                });
            }
        });
    }

    validarCampos(): boolean {
        if (this.logoUrl && !this.isUrl(this.logoUrl)) {
            this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Logo URL inválida.' });
            return false;
        }
        if (this.websiteUrl && !this.isUrl(this.websiteUrl)) {
            this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Website inválido.' });
            return false;
        }
        return true;
    }

    validarUrl(type: string) {
        const url = type === 'logo' ? this.logoUrl : type === 'website' ? this.websiteUrl : type === 'logoEdit' ? this.partner.logoUrl : this.partner.websiteUrl;

        if (url && !this.isUrl(url)) {
            this.message.add({ severity: 'warn', summary: 'URL inválida', detail: 'Digite uma URL válida.' });
        }
    }

    isUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    resetar() {
        this.name = '';
        this.description = '';
        this.logoUrl = '';
        this.websiteUrl = '';
        this.isActive = true;
    }
}
