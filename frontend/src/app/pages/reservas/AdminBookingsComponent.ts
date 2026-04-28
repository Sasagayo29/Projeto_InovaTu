import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BookingService } from '@/core/service/booking.service';
import { DatePicker } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { Booking } from '@/core/types/booking.interface';
import { formatDateSTU } from '@/core/utils/global.utils';

@Component({
    selector: 'app-admin-bookings',
    standalone: true,
    imports: [SelectModule, CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, Toast, DialogModule, ConfirmDialogModule, RippleModule, DatePicker, DialogModule, TextareaModule],
    providers: [MessageService, ConfirmationService],
    template: `
        <p-toast position="top-center"></p-toast>
        <p-confirmDialog></p-confirmDialog>

        <div class="flex items-center justify-center">
            <div class="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">
                <h1 class="text-2xl font-semibold mb-4 text-center">Gerenciamento de Reservas</h1>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label class="block text-sm mb-1">Status</label>
                        <p-select [options]="statusOptions" [(ngModel)]="status" optionLabel="name" optionValue="value" [checkmark]="true" [showClear]="true" placeholder="Selecione" class="w-full" />
                    </div>

                    <div>
                        <label class="block text-sm mb-1">ID Sala</label>
                        <input pInputText class="w-full border rounded px-3 py-2" [(ngModel)]="roomId" placeholder="Ex: 5" />
                    </div>
                    <div>
                        <label class="block text-sm mb-1">Data</label>
                        <p-datepicker [(ngModel)]="date" dateFormat="dd/mm/yy" fluid readonlyInput="true" [showIcon]="true" appendTo="body" styleClass="w-full">></p-datepicker>
                    </div>
                </div>

                <p-button label="Filtrar" styleClass="w-full mb-4" (click)="listar()"></p-button>

                <p-table [value]="bookings" [paginator]="true" [rows]="5" *ngIf="bookings.length > 0">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>ID</th>
                            <th>Sala</th>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Usuário</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </ng-template>

                    <ng-template pTemplate="body" let-item>
                        <tr>
                            <td>{{ item.id }}</td>
                            <td>{{ item.roomName }}</td>
                            <td>{{ formatDate(item.startTime) }}</td>
                            <td>{{ formatTime(item.startTime) }} ás {{ formatTime(item.endTime) }}</td>
                            <td>{{ item.userName }}</td>
                            <td>{{ item.status }}</td>
                            <td class="flex gap-2">
                                <p-button icon="pi pi-check" severity="success" rounded text [disabled]="item.status !== 'PENDENTE'" (click)="aprovar(item)" />
                                <p-button icon="pi pi-times" severity="danger" rounded text [disabled]="item.status !== 'PENDENTE'" (click)="dialogo(item)" />
                                <p-button icon="pi pi-trash" severity="danger" rounded text (click)="excluir(item)" />
                            </td>
                        </tr>
                    </ng-template>
                </p-table>

                <p *ngIf="bookings.length == 0" class="text-center text-gray-500 mt-4">Nenhuma reserva encontrada.</p>
            </div>
        </div>
        <p-dialog [(visible)]="dialog" header="Respondendo Motivo" [modal]="true" [style]="{ width: '500px' }">
            <div class="space-y-4">
                <label>Resposta:</label>
                <textarea [(ngModel)]="reason" rows="5" cols="30" fluid pTextarea class="w-full "></textarea>
            </div>

            <ng-template pTemplate="footer">
                <p-button label="Enviar" (onClick)="rejeitar()"></p-button>
                <p-button label="Cancelar" severity="secondary" (onClick)="dialog = false"></p-button>
            </ng-template>
        </p-dialog>
    `
})
export class AdminBookingsComponent {
    bookings: Booking[] = [];
    idReserva: number = 0;
    reason: string = '';
    dialog = false;
    statusOptions = [
        { name: 'Todos', value: null },
        { name: 'Pendente', value: 'PENDENTE' },
        { name: 'Aprovado', value: 'APROVADO' },
        { name: 'Rejeitado', value: 'REJEITADO' }
    ];
    status: string = '';
    roomId: number | null = null;
   date: Date | null = null;

    constructor(
        private service: BookingService,
        private message: MessageService,
        private confirm: ConfirmationService
    ) {}

    ngOnInit() {
        this.listar();
    }

listar() {
    this.service.getAll({
        status: this.status || undefined,
        roomId: this.roomId ? Number(this.roomId) : undefined,
        date: this.date ? formatDateSTU(this.date) : undefined
    }).subscribe({
        next: (res) => (this.bookings = res),
        error: () =>
            this.message.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Falha ao carregar reservas.'
            })
    });
}


    aprovar(item: Booking) {
        this.service.approve(item.id).subscribe({
            next: (res: any) => {
                this.message.add({ severity: 'success', summary: 'Aprovado', detail: 'Reserva aprovada.' });
                this.listar();
            }
        });
    }
    dialogo(item: Booking) {
        this.dialog = true;
        this.idReserva = item.id;
    }
    rejeitar() {
        this.dialog = false;
        this.service.reject(this.idReserva, this.reason).subscribe({
            next: () => {
                this.message.add({
                    severity: 'warn',
                    summary: 'Rejeitada',
                    detail: 'Reserva rejeitada.'
                });
                this.listar();
            },
            error: (err) => {
                console.error(err);
                this.message.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: err?.error?.message || 'Erro ao rejeitar a reserva. Tente novamente.'
                });
            }
        });
    }

    excluir(item: Booking) {
        this.confirm.confirm({
            message: `Remover reserva #${item.id}?`,
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.dialogo(item);
                this.service.delete(item.id).subscribe({
                    next: () => {
                        this.message.add({
                            severity: 'success',
                            summary: 'Removida',
                            detail: 'Reserva excluída.'
                        });
                        this.listar();
                    },
                    error: (err) => {
                        console.error(err);

                        this.message.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: err?.error?.message || 'Erro ao excluir a reserva.'
                        });
                    }
                });
            }
        });
    }
    formatDate(date: string) {
        return new Date(date).toLocaleDateString('pt-BR');
    }

    formatTime(date: string) {
        return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
}
