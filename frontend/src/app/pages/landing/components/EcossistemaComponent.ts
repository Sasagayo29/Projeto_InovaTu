import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PartnerService } from '@/core/service/partner.service';
import { Partner } from '@/core/types/partner.interface';
import { SelectModule } from 'primeng/select';
import { ajustetela } from '@/core/utils/global.utils';
import { RecaptchaService } from '@/core/service/recaptcha.service';
import { TextareaModule } from 'primeng/textarea';

declare const grecaptcha: any;
@Component({
    selector: 'app-ecossistema',
    standalone: true,
    imports: [SelectModule, CommonModule, FormsModule, ButtonModule, CarouselModule, InputTextModule, ToastModule, TextareaModule],
    providers: [MessageService],
    template: `
        <p-toast position="top-center"></p-toast>
        <div class="relative min-h-screen overflow-hidden">
            <img src="assets/images/fundologin-1.png" alt="Fundo login" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="relative">
                <section id="o-que-e-ecossistema" class="max-w-6xl mx-auto px-6 py-20 ">
                    <div class="max-w-3xl">
                        <p class="text-4xl md:text-5xl text-white/80 font-extrabold mb-6">Conheça o <span class="text-pink-400">Ecossistema</span> InovaTu</p>

                        <p class="text-lg leading-relaxed text-white/90 mb-4 text-justify">
                            Um ecossistema de inovação é uma rede dinâmica e interconectada de agentes — empresas, startups, universidades, centros de pesquisa, governo e investidores — que colaboram para estimular o desenvolvimento tecnológico e o
                            crescimento econômico regional.
                        </p>

                        <p class="text-lg leading-relaxed text-white/80 mb-4 text-justify">
                            O Ecossistema InovaTu é o nosso hub de criação e colaboração em Paracatu. Nosso objetivo é facilitar a transferência de conhecimento, promover o empreendedorismo inovador e garantir que a tradição da nossa região se
                            conecte com o futuro da tecnologia.
                        </p>

                        <p class="text-lg leading-relaxed text-white/80">Se você tem uma startup ou é um investidor, junte-se à nossa rede para gerar valor e impacto social.</p>
                    </div>
                </section>
                <section id="startups-membros" class="bg-[#300060] py-16">
                    <div class=" mx-auto px-6">
                        <div class="text-center mb-10">
                            <p class="text-3xl md:text-4xl font-bold text-white/80">Nossos <span class="text-pink-400">Membros</span></p>
                        </div>
                        <div class="mx-auto bg-[#2a1458]!  ">
                            <p-carousel [value]="partners" [numVisible]="4" [numScroll]="1" [circular]="true" [responsiveOptions]="ajuste()" autoplayInterval="3500">
                                <ng-template pTemplate="item" let-partner>
                                    <div
                                        class="flex flex-col text-center itens-center justify-center bg-purple-900/30 border border-white/10 rounded-xl m-3 p-5 cursor-pointer hover:bg-purple-900/40 transition-all h-[260px] flex flex-col justify-between"
                                        (click)="abrirSite(partner.websiteUrl)"
                                    >
                                        <div class="mb-4">
                                            <div class="relative mx-auto flex justify-center h-21 ">
                                                <img [src]="partner.logoUrl" [alt]="partner.name" class=" bg-white p-3 rounded-lg shadow-md" />
                                            </div>
                                        </div>

                                        <div class="mb-2 font-semibold text-lg text-white">
                                            {{ partner.name }}
                                        </div>

                                        <p class="text-sm text-white/90">
                                            {{ partner.description }}
                                        </p>
                                    </div>
                                </ng-template>
                            </p-carousel>
                        </div>
                    </div>
                </section>
                <section id="seja-membro-cta" class="py-16">
                    <div class="max-w-6xl mx-auto px-6">
                        <div class="bg-gradient-to-br from-[#1a052b]/60 via-[#300060]/60 to-transparent rounded-2xl p-8 md:p-12 shadow-2xl grid md:grid-cols-2 gap-8 items-start">
                            <div>
                                <p class="text-3xl font-extrabold text-pink-400 mb-4 ">Junte-se à Inovação e Cresça!</p>
                                <p class="text-white/80 mb-6">Fazer parte do Ecossistema InovaTu é ter acesso direto às principais conexões de Paracatu:</p>

                                <ul class="space-y-3 text-white/90">
                                    <li class="flex items-start gap-3">
                                        <span class="text-[#5c00d4] text-xl">★</span>
                                        <span> Acesso à infraestrutura de ponta (Salas, Lab Maker).</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="text-[#5c00d4] text-xl">★</span>
                                        <span> Rede de Mentoria e Programas de Aceleração.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="text-[#5c00d4] text-xl">★</span>
                                        <span> Networking Estratégico com empresas e governo.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="text-[#5c00d4] text-xl">★</span>
                                        <span> Visibilidade da sua marca e projetos no ecossistema.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <span class="text-[#5c00d4] text-xl">★</span>
                                        <span> Oportunidades de Investimento e Parceria.</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-white rounded-xl p-6 text-gray-800 shadow-xl">
                                <h3 class="text-2xl font-bold mb-3 text-[#300060]">Faça Parte do Ecossistema!</h3>
                                <p class="text-sm text-gray-600 mb-6">Preencha o formulário para se candidatar ou agendar uma conversa com nosso time.</p>
                                <form #loginForm="ngForm" (ngSubmit)="enviarFormulario(loginForm)">
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Nome Completo</label>
                                        <input pInputText type="text" name="nome" [(ngModel)]="form.nome" required class="w-full p-3 rounded-md border" />
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-1">E-mail Corporativo</label>
                                        <input pInputText type="email" name="email" [(ngModel)]="form.email" required email class="w-full p-3 rounded-md border" />
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-1">Empresa / Área de Atuação</label>
                                        <input pInputText type="text" name="empresa" [(ngModel)]="form.empresa" class="w-full p-3 rounded-md border" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Whatsapp</label>
                                        <input pInputText type="text" name="Whatsapp" [(ngModel)]="form.contato" class="w-full p-3 rounded-md border" />
                                    </div>
                                    <div class="mb-1 mt-3">
                                        <p-select name="selectedtype" [options]="type" [(ngModel)]="form.selectedtype" optionLabel="name" optionValue="name" fluid placeholder="Selecionar tipo de parceria" class="w-full md:w-56 " />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-1">Objetivo e Motivação</label>
                                        <textarea pInputTextarea rows="4" name="mensagem" [(ngModel)]="form.mensagem" class="w-full p-3 rounded-md border"></textarea>
                                    </div>

                                    <div class="pt-2">
                                        <button pButton type="submit" label="Enviar Candidatura" class="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-md"></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `
})
export class EcossistemaComponent {
    loading = false;
    partners: Partner[] = [];
    type = [{ name: 'STARTUP' }, { name: 'EMPRESA' }, { name: 'INVESTIDOR' }, { name: 'CONTRIBUINTE' }];
    form = {
        nome: '',
        email: '',
        empresa: '',
        contato: '',
        selectedtype: '',
        mensagem: ''
    };

    constructor(
        private messageService: MessageService,
        private service: PartnerService,
        private recaptchaService: RecaptchaService
    ) {}

    ngOnInit() {
        this.service.getPartners().subscribe({
            next: (data) => {
                this.partners = data.filter((p) => p.isActive);
            },
            error: (err) => console.error(err)
        });
    }

    async enviarFormulario(form: any) {
        if (!this.form.nome || !this.form.email) {
            this.messageService.add({ severity: 'warn', summary: 'Campos obrigatórios', detail: 'Preencha nome e e-mail.' });
            return;
        }

        const token = await this.recaptchaService.execute('enviar_proposta');
        this.service.postProposais(this.form.nome, this.form.email, this.form.contato, this.form.mensagem, this.form.selectedtype, token).subscribe(
            (res: any) => {
                console.log('token', res);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Proposta realizada com sucesso'
                });
                form.resetForm();
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                const mensagem = error.error?.message || 'Erro inesperado.';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Enviar Proposta',
                    detail: mensagem
                });
            }
        );
    }

    abrirSite(url: string) {
        if (url) window.open(url, '_blank');
    }
    ajuste() {
        return ajustetela();
    }
}
