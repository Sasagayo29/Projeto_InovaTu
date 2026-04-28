import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'app-agendar-sala',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, DatePicker],
    template: `
        <div class=" min-h-screen text-white font-sans px-6 py-16">
            <div class="max-w-6xl mx-auto text-center">
                <div class="text-4xl md:text-5xl font-extrabold mb-12">Agendamento de Sala</div>
                <div class="bg-[#300060] rounded-xl shadow-2xl p-8 md:p-12">
                    <div class="flex flex-wrap justify-center gap-4 mb-10">
                        <button
                            *ngFor="let sala of salas"
                            (click)="selecionarSala(sala)"
                            [class.bg-[#FF2379]]="salaSelecionada === sala"
                            [class.text-white]="salaSelecionada === sala"
                            class="bg-white/10 text-white px-6 py-2 rounded-full font-semibold uppercase tracking-wide hover:bg-[#FF2379]/80 transition-all duration-300"
                        >
                            {{ sala }}
                        </button>
                    </div>
                    <div class="text-2xl font-bold mb-6">Disponibilidade - {{ salaSelecionada }}</div>
                    <div class="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                        <p-datepicker [(ngModel)]="dataSelecionada" dateFormat="dd/mm/yy" [showIcon]="true" class="text-2xl" readonlyInput="true"> </p-datepicker>
                    </div>
                    <div class="flex justify-center flex-wrap gap-3 mb-10">
                        <div *ngFor="let dia of semana" (click)="selecionarDia(dia)" [class.bg-[#5c00d4]]="diaSelecionado === dia" class="cursor-pointer p-3 rounded-lg text-center transition-all duration-300 hover:bg-[#5c00d4]/60">
                            <div class="text-2xl font-bold">{{ dia.numero }}</div>
                            <div class="text-xs uppercase text-gray-300">{{ dia.nome }}</div>
                        </div>
                    </div>
                    <div class="max-w-3xl mx-auto text-left">
                        <div *ngFor="let turno of turnos" class="mb-8 border-b border-white/10 pb-4">
                            <div class="text-[#FF2379] text-lg font-bold uppercase mb-4">
                                {{ turno.nome }}
                            </div>

                            <div class="flex flex-wrap gap-3">
                                <button
                                    *ngFor="let horario of turno.horarios"
                                    [disabled]="!horario.disponivel"
                                    (click)="selecionarHorario(horario)"
                                    class="px-5 py-2 rounded-md font-semibold transition-all duration-200"
                                    [class.bg-[#FF2379]]="horario.disponivel"
                                    [class.bg-[#300060]]="!horario.disponivel"
                                    [class.text-white]="true"
                                    [class.opacity-40]="!horario.disponivel"
                                    [class.cursor-not-allowed]="!horario.disponivel"
                                    [class.hover:bg-[#d11d62]]="horario.disponivel"
                                >
                                    {{ horario.label }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AgendarSalaComponent {
    salas = ['Sala de Treinamento 1', 'Sala de Treinamento 2', 'Laboratório Maker', 'Sala de Reunião'];
    salaSelecionada = this.salas[0];

    dataSelecionada: Date | null = null;

    semana = [
        { numero: 21, nome: 'Seg' },
        { numero: 22, nome: 'Ter' },
        { numero: 23, nome: 'Qua' },
        { numero: 24, nome: 'Qui' },
        { numero: 25, nome: 'Sex' },
        { numero: 26, nome: 'Sáb' },
        { numero: 27, nome: 'Dom' }
    ];
    diaSelecionado = this.semana[2];

    turnos = [
        {
            nome: 'Manhã (08:00 - 12:00)',
            horarios: [
                { label: '08:00 - 09:00', disponivel: false },
                { label: '09:00 - 10:00', disponivel: false },
                { label: '10:00 - 11:00', disponivel: true },
                { label: '11:00 - 12:00', disponivel: true }
            ]
        },
        {
            nome: 'Tarde (12:00 - 18:00)',
            horarios: [
                { label: '12:00 - 13:00', disponivel: true },
                { label: '13:00 - 14:00', disponivel: true },
                { label: '14:00 - 15:00', disponivel: true },
                { label: '15:00 - 16:00', disponivel: false },
                { label: '17:00 - 18:00', disponivel: false }
            ]
        }
    ];

    selecionarSala(sala: string) {
        this.salaSelecionada = sala;
    }

    selecionarDia(dia: any) {
        this.diaSelecionado = dia;
    }

    selecionarHorario(horario: any) {
        if (horario.disponivel) {
            alert(`Horário selecionado: ${horario.label}`);
        }
    }
}
