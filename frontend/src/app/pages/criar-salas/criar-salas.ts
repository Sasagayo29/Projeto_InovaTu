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
import { Room } from '@/core/types/room.interface';
import { RoomService } from '@/core/service/room.service';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-salas-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, ToastModule, ButtonModule, InputTextModule, TableModule, ConfirmDialogModule, DialogModule,TextareaModule,InputNumberModule],
    providers: [MessageService, ConfirmationService],
    template: `
        <p-toast position="top-center"></p-toast> <p-confirmDialog></p-confirmDialog>

        <div class="flex items-center justify-center ">
            <div class="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
                <h1 class="text-2xl font-semibold mb-4 text-center">Gerenciar Salas</h1>
                <form #f="ngForm" (ngSubmit)="criarSala(f)" class="space-y-4">
                    <div>
                        <label class="block text-sm mb-1">Nome</label>
                        <input pInputText [(ngModel)]="name" name="name" required class="w-full rounded-md border px-3 py-2" />
                    </div>

                    <div class="w-full">
                        <label class="block text-sm mb-1">Descrição</label>
                        <textarea [(ngModel)]="description" name="descricao" rows="5" cols="30" pTextarea  fluid></textarea>
                    </div>

                    <div>
                        <label class="block text-sm mb-1">Capacidade</label>
                        <p-inputnumber [(ngModel)]="capacity" name="capacidade" inputId="capacity"  fluid />
                    </div>

                    <p-button label="Criar Sala" type="submit" [loading]="loading" styleClass="w-full"></p-button>
                </form>

                <h2 class="text-xl font-semibold mt-10 mb-3 text-center">Salas cadastradas</h2>

                <p-table [value]="rooms" [paginator]="true" [rows]="5">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Capacidade</th>
                            <th>Ações</th>
                        </tr>
                    </ng-template>

                    <ng-template pTemplate="body" let-room>
                        <tr>
                            <td>{{ room.id }}</td>
                            <td>{{ room.name }}</td>
                            <td>{{ room.description }}</td>
                            <td>{{ room.capacity }}</td>
                            <td class="flex gap-2">
                                <p-button icon="pi pi-pencil" severity="info" [rounded]="true" [text]="true" (onClick)="editar(room)"> </p-button>
                                <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [text]="true" (onClick)="excluir(room)"> </p-button>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>

        <p-dialog [(visible)]="dialog" header="Editar Sala" [modal]="true" [style]="{ width: '500px' }">
            <div class="space-y-4">
                <label>Nome</label>
                <input pInputText [(ngModel)]="roomEdit.name" class="w-full" />

                <label>Descrição</label>
                <textarea [(ngModel)]="roomEdit.description" rows="3" class="w-full"></textarea>

                <label>Capacidade</label>
                <input type="number" [(ngModel)]="roomEdit.capacity" min="0" class="w-full" />
            </div>

            <ng-template pTemplate="footer">
                <p-button label="Salvar" (onClick)="salvarEdicao(roomEdit)"></p-button>
                <p-button label="Cancelar" severity="secondary" (onClick)="dialog = false"></p-button>
            </ng-template>
        </p-dialog>
    `
})
export class SalasAdmin implements OnInit {
    rooms: Room[] = [];
    roomEdit: Room | any = {};
    name = '';
    description = '';
    capacity: number | null = null;
    dialog = false;
    loading = false;

    constructor(
        private roomService: RoomService,
        private message: MessageService,
        private confirm: ConfirmationService
    ) {}

    ngOnInit() {
        this.listar();
    }

    listar() {
        this.roomService.getAllRoom().subscribe({
            next: (res) => (this.rooms = res),
            error: () =>
                this.message.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar salas'
                })
        });
    }

    criarSala(form: any) {
        if (!form.valid) {
            this.message.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha o nome da sala.'
            });
            return;
        }

        this.loading = true;

        const body =
            {
                name: this.name,
                description: this.description,
                capacity: this.capacity ?? 0
            };

        this.roomService.postCriarRoom(body).subscribe({
            next: () => {
                this.message.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Sala criada.'
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
                    detail: 'Falha ao criar sala.'
                });
            }
        });
    }

    editar(room: Room) {
        this.roomEdit = { ...room };
        this.dialog = true;
    }

    salvarEdicao(room: Room) {
        const body = {
            name: room.name,
            description: room.description,
            capacity: room.capacity ?? 0
        };
        this.roomService.putRoom(room.id!,body).subscribe({
            next: () => {
                this.message.add({
                    severity: 'success',
                    summary: 'Atualizado',
                    detail: 'Sala atualizada.'
                });
                this.dialog = false;
                this.listar();
            }
        });
    }

    excluir(room: Room) {
        this.confirm.confirm({
            header: 'Confirmação',
            message: `Deseja excluir "${room.name}"?`,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roomService.delete(room.id!).subscribe({
                    next: () => {
                        this.message.add({
                            severity: 'success',
                            summary: 'Removido',
                            detail: 'Sala excluída.'
                        });
                        this.listar();
                    }
                });
            }
        });
    }
}
