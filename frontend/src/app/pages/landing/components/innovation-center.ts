import { AvailabilityDay, Room, RoomAvailability, Turno } from '@/core/types/room.interface';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { BookingService } from '@/core/service/booking.service';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RoomService } from '@/core/service/room.service';
import { RecaptchaService } from '@/core/service/recaptcha.service';

@Component({
    selector: 'innovation-center',
    standalone: true,
    imports: [CommonModule, DialogModule, FormsModule, DatePicker, InputTextModule, MessageModule, ButtonModule, Toast],
    providers: [MessageService],
    template: `
        <p-toast position="top-center"></p-toast>

        <p-dialog [(visible)]="popupAberto" [modal]="true" [dismissableMask]="true" [style]="dialogStyle" [draggable]="false" [resizable]="false">
            <ng-template pTemplate="content">
                <div class="text-white font-sans ">
                    <div class="max-w-6xl mx-auto text-center pb-60 ">
                        <div class="bg-[#300060] rounded-xl p-8">
                            <div class="text-4xl md:text-5xl font-extrabold mb-12">Agendamento de Sala</div>
                            <div class="flex justify-center gap-5 mb-5 ">
                                <p-datepicker name="dataSelecionada" [(ngModel)]="dataSelecionada" dateFormat="dd/mm/yy" selectionMode="range" [showIcon]="true" [readonlyInput]="true"></p-datepicker>
                                <p-button type="submit" label="CONSULTAR DATA" (click)="buscarSalas()"></p-button>
                            </div>
                            @if (mostrarSalas) {
                                <div class="flex flex-wrap justify-center mb-10 gap-4">
                                    @for (sala of salasReserva; track sala.roomId) {
                                        <button (click)="selecionarSala(sala)" class="bg-white/10 text-white px-6 py-2 rounded-full font-semibold uppercase tracking-wide hover:bg-[#FF2379]/80 transition-all duration-300">
                                            {{ sala.roomName }}
                                        </button>
                                    }
                                </div>
                            }

                            @if (diaHora.length && mostrarDatas) {
                                <div class="flex justify-center flex-wrap gap-3 mb-8">
                                    @for (dia of diaHora; track dia.date) {
                                        <div (click)="selecionarDia(dia)" class="cursor-pointer p-3 rounded-lg text-center transition-all duration-300 hover:bg-[#5c00d4]/60" [class.bg-[#5c00d4]]="diaSelecionado === dia.date">
                                            <div class="text-2xl font-bold">
                                                {{ dia.date | date: 'dd' }}
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                            @if (turnos.length && mostrarHorarios) {
                                <div class="max-w-3xl mx-auto text-left">
                                    @for (turno of turnos; track turno.nome) {
                                        <div class=" border-b border-white/10 pb-4">
                                            <div class="text-[#FF2379] text-lg font-bold uppercase mb-4">
                                                {{ turno.nome }}
                                            </div>

                                            <div class="flex flex-wrap gap-3 justify-center">
                                                @for (horario of turno.horarios; track horario) {
                                                    <button
                                                        (click)="selecionarHorario(horario)"
                                                        class="px-5 py-2 rounded-md font-semibold transition-all duration-200 hover:opacity-80"
                                                        [class.bg-[#FF2379]]="horarioSelecionado === horario"
                                                        [class.bg-[#300060]]="horarioSelecionado !== horario"
                                                    >
                                                        {{ horario }}
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                            <div class="fixed bottom-16 left-0 w-full flex justify-center px-8">
                                <p-button fluid label="Confirmar Agendamento" styleClass="w-full" class="w-full" type="submit" (onClick)="confirmarAgendamento()"></p-button>
                            </div>
                        </div>
                    </div>
                </div>
            </ng-template>
        </p-dialog>
        <div class="min-h-screen w-full text-white bg-[#1a052b] font-sans overflow-x-hidden">
            <div class="flex flex-col items-center text-center py-20 px-6 relative">
                <div class="text-4xl md:text-5xl font-extrabold mb-8 z-40">Conheça o <span class="text-[#FF2379]">Centro de Inovação</span> InovaTu</div>
                <img src="assets/images/fundologin-1.png" alt="Fundo login" class="absolute inset-0 w-full h-full object-cover z-0" />

                <div class="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl mb-16 z-30">
                    <video class="w-full h-full object-cover" controls autoplay muted loop>
                        <source src="assets/vid/INOVAÇÃO.mp4" type="video/mp4" />
                    </video>
                </div>

                <div class="flex flex-col md:flex-row justify-between items-start gap-10 px-8 md:px-16 py-20 relative w-full">
                    <div class="text-3xl md:text-4xl font-bold text-[#FF2379] uppercase w-full md:w-1/3 ">O que é o Centro de Inovação?</div>

                    <div class="w-full md:w-2/3 text-base leading-relaxed text-gray-200 space-y-4 text-justify ">
                        <div class="text-2xl">
                            O Centro de Inovação InovaTu é a infraestrutura física e conceitual que centraliza o ecossistema de Paracatu. É um espaço moderno e colaborativo, projetado para impulsionar o desenvolvimento de novas ideias, projetos e
                            soluções tecnológicas, atuando como um hub para empresas, startups e a comunidade acadêmica.
                        </div>
                        <div class="text-2xl">
                            Oferecemos acesso a laboratórios, salas de reunião equipadas com tecnologia de ponta e ambientes de coworking que facilitam a troca de conhecimento, a mentoria e o <em>networking</em>. Nosso objetivo é transformar a teoria
                            em prática, acelerando a diversificação econômica da região.
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-12 md:py-24 px-4 sm:px-8 md:px-16 bg-[#300060] text-center">
                <div class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12">Nossas Salas</div>

                <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center">
                    <div *ngFor="let sala of salas" class="bg-white/10 rounded-xl overflow-hidden shadow-xl w-full max-w-xs sm:max-w-sm md:w-72 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[#5c00d4]/60">
                        <div class="p-3 sm:p-4 text-justify">
                            <div class="text-lg sm:text-xl text-[#FF2379] font-semibold mb-2 text-center">{{ sala.name }}</div>
                            <div class="text-xs sm:text-sm text-gray-300">{{ sala.description }}</div>
                            <div class="text-xs sm:text-sm text-gray-300 mt-2">Capacidade: {{ sala.capacity }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-12 md:py-24 px-4 sm:px-8 md:px-16 bg-[#300060] text-center">
                <div class="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">Preencha o formulário e conheça nossas salas</div>

                <form #form="ngForm" (ngSubmit)="abrirPopup(form)" class="p-4 bg-white/10 rounded-xl max-w-xl mx-auto">
                    <div class="text-xl font-bold mb-4 text-center">Dados do Solicitante</div>

                    <div class="flex flex-col mb-3">
                        <input
                            pInputText
                            type="text"
                            name="userName"
                            [(ngModel)]="userName"
                            placeholder="Nome"
                            required
                            #userNameRef="ngModel"
                            [invalid]="userNameRef.invalid && (userNameRef.touched || form.submitted)"
                            class="p-2 rounded text-black"
                        />

                        @if (userNameRef.invalid && (userNameRef.touched || form.submitted)) {
                            <p-message severity="error" size="small" variant="simple">Nome é obrigatório.</p-message>
                        }
                    </div>

                    <div class="flex flex-col mb-3">
                        <input
                            pInputText
                            type="email"
                            name="userEmail"
                            [(ngModel)]="userEmail"
                            placeholder="E-mail"
                            required
                            email
                            #emailRef="ngModel"
                            [invalid]="emailRef.invalid && (emailRef.touched || form.submitted)"
                            class="p-2 rounded text-black"
                        />

                        @if (emailRef.invalid && (emailRef.touched || form.submitted)) {
                            <p-message severity="error" size="small" variant="simple">
                                @if (emailRef.hasError('required')) {
                                    E-mail é obrigatório.
                                }
                                @if (emailRef.hasError('email')) {
                                    Informe um e-mail válido.
                                }
                            </p-message>
                        }
                    </div>

                    <div class="flex flex-col mb-3">
                        <input
                            pInputText
                            type="text"
                            name="userInstitution"
                            [(ngModel)]="userInstitution"
                            placeholder="Instituição"
                            required
                            #instRef="ngModel"
                            [invalid]="instRef.invalid && (instRef.touched || form.submitted)"
                            class="p-2 rounded text-black"
                        />

                        @if (instRef.invalid && (instRef.touched || form.submitted)) {
                            <p-message severity="error" size="small" variant="simple">Instituição é obrigatória.</p-message>
                        }
                    </div>

                    <div class="flex flex-col mb-3">
                        <input
                            pInputText
                            type="text"
                            name="purpose"
                            [(ngModel)]="purpose"
                            placeholder="Finalidade"
                            required
                            #purposeRef="ngModel"
                            [invalid]="purposeRef.invalid && (purposeRef.touched || form.submitted)"
                            class="p-2 rounded text-black"
                        />

                        @if (purposeRef.invalid && (purposeRef.touched || form.submitted)) {
                            <p-message severity="error" size="small" variant="simple">Finalidade é obrigatória.</p-message>
                        }
                    </div>

                    <button pButton severity="secondary" type="submit" class="w-full py-3">
                        <span pButtonLabel>Continuar para seleção da sala</span>
                    </button>
                </form>
            </div>
        </div>
    `
})
export class InnovationCenterComponent {
    popupAberto = false;
    mostrarSalas = false;
    mostrarDatas = false;
    mostrarHorarios = false;
    former: any;
    salas: Room[] = [];
    salasReserva: RoomAvailability[] = [];

    dataSelecionada: Date[] = [];

    diaHora: AvailabilityDay[] = [];
    turnos: Turno[] = [];

    diaSelecionado: string = '';
    horarioSelecionado: string = '';

    salaSelecionada: RoomAvailability | null = null;

    userName = '';
    userEmail = '';
    userInstitution = '';
    purpose = '';
    hora: any[] = [];

    constructor(
        private bookingService: BookingService,
        private roomService: RoomService,
        private recaptchaService: RecaptchaService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.roomService.getPublicAllRoom().subscribe({
            next: (data) => (this.salas = data),
            error: (err) => console.error(err)
        });
    }

    abrirPopup(form: NgForm) {
        this.former = form;
        if (form.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha todos os campos corretamente.'
            });
            return;
        }
        this.popupAberto = true;
    }

    buscarSalas() {
        this.bookingService.getPublicAllRoomData(this.dataSelecionada[0], this.dataSelecionada[1]).subscribe({
            next: (data: RoomAvailability[]) => {
                this.salasReserva = data;
                this.mostrarSalas = true;
                this.mostrarDatas = false;
                this.mostrarHorarios = false;
            },
            error: (err) => {}
        });
    }

    selecionarSala(sala: RoomAvailability) {
        this.salaSelecionada = sala;
        this.diaHora = sala.availability as AvailabilityDay[];
        this.mostrarDatas = true;
        this.diaSelecionado = '';
        this.turnos = [];
        this.horarioSelecionado = '';
    }

    selecionarDia(dia: AvailabilityDay) {
        this.diaSelecionado = dia.date;
        this.horarioSelecionado = '';
        this.mostrarHorarios = true;
        this.turnos = [
            { nome: 'Manhã', horarios: dia.morning },
            { nome: 'Tarde', horarios: dia.afternoon }
        ];
    }

    selecionarHorario(horario: string) {
        this.horarioSelecionado = horario;
    }

    confirmarAgendamento() {
        if (!this.salaSelecionada || !this.diaSelecionado || !this.horarioSelecionado) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha todos os campos corretamente.'
            });
            return;
        }
        const token = this.recaptchaService.execute('enviar_proposta');
        const horarioInicio = this.horarioSelecionado.split(' - ')[0];
        const horarioFim = this.horarioSelecionado.split(' - ')[1];
        const body = {
            roomId: this.salaSelecionada?.roomId,
            startTime: this.diaSelecionado + 'T' + horarioInicio,
            endTime: this.diaSelecionado + 'T' + horarioFim,
            userName: this.userName,
            userEmail: this.userEmail,
            userInstitution: this.userInstitution,
            purpose: this.purpose
        };
        this.bookingService.createBooking(body).subscribe({
            next: (data: any) => {
                const msg = data.message
               this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: msg
            });
                this.popupAberto = false;
                this.former.resetForm();
            },
            error: (err) => {
                const mensagem = err.error?.message || 'Erro inesperado.';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Logar',
                    detail: mensagem
                });
            }
        });
    }

    dialogStyle = {
        background: '#300060',
        width: window.innerWidth < 768 ? '95vw' : '45vw',
        height: window.innerWidth < 768 ? '90vh' : '88vh'
    };
}
