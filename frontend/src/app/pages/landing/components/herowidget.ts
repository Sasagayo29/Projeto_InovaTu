import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { PartnerService } from '@/core/service/partner.service';
import { Partner } from '@/core/types/partner.interface';
import { Router } from '@angular/router';
import { Poste } from '@/core/types/noticia.interface';
import { PostagensService } from '@/core/service/Posts.service';
import { ajustetela } from '@/core/utils/global.utils';
import { DetalheComponent } from './detalhe-noticia';
import { BookingService } from '@/core/service/booking.service';
import { ContactService } from '@/core/service/contact.service';
import { ContactSubmission } from '@/core/types/contact.interface';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { RecaptchaService } from '@/core/service/recaptcha.service';
import { NgForm } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { CuratorFeedComponent } from './curator-feed.component';

@Component({
    selector: 'hero-widget',
    standalone: true,
    providers: [MessageService],
    imports: [ButtonModule, RippleModule, CarouselModule, CommonModule, DetalheComponent, FormsModule, InputTextModule, Toast, CuratorFeedComponent],
    template: `
        @if (noticiaSelecionada) {
            <app-detalhe *ngIf="noticiaSelecionada" [noticiaSelecionada]="noticiaSelecionada" (voltar)="fecharDetalhe()"> </app-detalhe>
        }
        @if (!noticiaSelecionada) {
            <p-toast position="top-center"></p-toast>
            <div id="hero" class="flex flex-col md:flex-row justify-between items-start pt-32 md:pt-40 lg:px-20 overflow-hidden bg-cover bg-center h-250" style="background-image:url('/assets/images/inovatu.png.svg')">
                <!-- Texto -->
                <div class="mx-6 md:mx-40 md:mt-6 w-full mb-20 md:mb-0 max-w-2xl">
                    <div class="text-3xl md:text-4xl leading-normal md:mt-4 text-[#ff9900] font-semibold">CONHEÇA O MOVIMENTO</div>

                    <div class="text-6xl md:text-8xl lg:text-9xl font-black text-white mt-2">INOVATU</div>

                    <div class="text-xl md:text-2xl leading-normal text-[#ff9900] font-light mt-6">O Coração Pulsante da Inovação em Paracatu.</div>
                    <div class="mt-2">
                        <p class="text-base md:text-xl leading-normal text-white mt-4 text-justify">
                            O Movimento InovaTu, um ecossistema de inovação que nasce e se desenvolve em Paracatu (MG), com o propósito de impulsionar a diversificação econômica e promover o desenvolvimento sustentável da região. Existimos para
                            conectar empresas, startups, universidades, centros de pesquisa, governo, investidores e a sociedade civil, criando um ambiente colaborativo onde ideias se transformam em soluções. Estimulamos o empreendedorismo, a
                            transferência de tecnologia e a valorização do potencial local, fortalecendo setores como o agronegócio, a tecnologia, a economia criativa e o turismo cultural. Nossa missão é unir tradição e inovação, contribuindo para um
                            futuro mais diversificado, resiliente e cheio de oportunidades para todos.
                        </p>
                    </div>
                </div>

                <!-- Vídeo -->
                <div class="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl mb-16 z-30">
                    <video class="w-full h-full object-cover" controls muted loop>
                        <source src="assets/vid/HOME.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            <div id="Paceiros" class="py-20 text-center bg-gradient-to-b bg-[#2a1458] xl:px-8">
                <p class="text-3xl font-bold text-white mb-10">Nossos <span class="text-[#ff9900]">Parceiros</span></p>

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

                <!---Sequencia News--->
                <div class="py-6 px-6 lg:px-20 mx-0" style="background: linear-gradient(0deg, rgba(26, 13, 52))">
                    <div class=" text-center mt-2 mb-6">
                        <div class="font-normal mb-15 text-5xl text-white">NEWS</div>
                        <div class="text-white font-[900] mb-2 text-4xl">Últimos acontecimentos envolvendo a Inovatu e empresas relacionadas:</div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        @if (this.noticias.length > 0) {
                            @for (noticia of this.noticias; track noticia.id) {
                                <section
                                    class="p-5 rounded-xl overflow-hidden bg-[#460f87] transition duration-300 ease-in-out
                                    hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/50 "
                                    (click)="abrirDetalhe(noticia)"
                                >
                                    <div class="w-full h-78 rounded-lg mb-4 overflow-hidden bg-white/10 bg-cover bg-center">
                                        <img class="w-full h-full object-cover" [src]="noticia.imageUrls" [alt]="noticia.title" />
                                    </div>

                                    <div class="flex flex-col gap-2 flex-1 ">
                                        <h2 class="text-2xl leading-[1.3] text-white! ">{{ noticia.title }}</h2>
                                    </div>

                                    <div class="flex justify-between items-center border-t border-white/10 pt-2">
                                        <p class="text-lg font-semibold uppercase text-[#ff2379]">
                                            {{ noticia.createdAt | date: 'dd/MM/yyyy' }}
                                        </p>
                                        <span class="text-lg text-[#b623ff] font-bold cursor-pointer">Leia Mais →</span>
                                    </div>
                                </section>
                            }
                        } @else {
                            <p class="text-center text-white">Nenhuma notícia encontrada.</p>
                        }
                    </div>

                    <div class="text-center mt-6">
                        <p-button (click)="verMais('news')" size="large" class=" text-white font-extrabold uppercase tracking-wide "> VER MAIS NOTÍCIAS </p-button>
                    </div>

                    <!---Sequencia Eventos--->
                    <div id="eventos">
                        <div class="col-span-12 text-center mt-30 mb-10">
                            <div class="font-[900] mb-15 text-5xl text-white">
                                Eventos
                                <span class="text-white">mais próximos:</span>
                            </div>
                            <div class="text-white font-normal mb-2 text-4xl"></div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                            @if (this.eventos.length > 0) {
                                @for (eventos of this.eventos; track eventos.id) {
                                    <section
                                        class="p-5 rounded-xl overflow-hidden bg-[#460f87] transition duration-300 ease-in-out
                                    hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/50"
                                        (click)="abrirDetalhe(eventos)"
                                    >
                                        <div class="w-full h-78 rounded-lg mb-4 overflow-hidden bg-white/10 bg-cover bg-center">
                                            <img class="w-full h-full object-cover" [src]="eventos.imageUrls" [alt]="eventos.title" />
                                        </div>

                                        <div class="flex flex-col gap-2 flex-1">
                                            <h2 class="text-2xl leading-[1.3] text-white!">{{ eventos.title }}</h2>
                                        </div>

                                        <div class="flex justify-between items-center border-t border-white/10 pt-2">
                                            <p class="text-lg font-semibold uppercase text-[#ff2379]">
                                                {{ eventos.createdAt | date: 'dd/MM/yyyy' }}
                                            </p>
                                            <span class="text-lg text-[#b623ff] font-bold cursor-pointer">Leia Mais →</span>
                                        </div>
                                    </section>
                                }
                            } @else {
                                <p class="text-center text-white">Nenhuma notícia encontrada.</p>
                            }
                        </div>
                        <div class="text-center mt-6">
                            <p-button (click)="verMais('Evento')" size="large" class=" text-white font-extrabold uppercase tracking-wide "> VER MAIS EVENTOS </p-button>
                        </div>
                        <!---Sequencia de Fotos da Galeria--->
                        <div id="pricing" class="py-20">
                            <div
                                class="flex flex-col md:flex-row justify-between items-start
                                        rounded-2xl p-10 gap-10 text-white
                                        bg-gradient-to-br from-[#1a0020] to-[#2a0040]"
                            >
                                <div
                                    class="w-full md:w-1/2
                                    bg-purple-900/30 backdrop-blur-md
                                    rounded-2xl p-6 shadow-lg
                                    border border-purple-800/50"
                                >
                                    <p class="text-2xl font-bold mb-6 text-[#07bcec]">Redes sociais</p>

                                    <app-curator-feed></app-curator-feed>
                                </div>

                                <div class="w-full md:w-1/2 md:pl-10">
                                    <div class="text-[#07bcec] font-[900] mb-6 text-5xl md:text-6xl">Galeria</div>

                                    <p class="text-xl md:text-3xl leading-normal text-white font-light text-justify">
                                        A Galeria do Movimento Inovatu é um espaço dedicado a mostrar a essência da nossa jornada: inovação, colaboração e desenvolvimento em ação. Aqui você encontra registros que celebram encontros, projetos e
                                        iniciativas que conectam pessoas, empresas, instituições e a comunidade de Paracatu em busca de soluções criativas e impacto social positivo. Cada imagem representa histórias de aprendizado, parcerias e
                                        progresso, inspirando novas formas de pensar e agir pelo futuro do nosso ecossistema inovador.
                                    </p>

                                    <div class="flex gap-4 mt-6 flex-wrap">
                                        <button
                                            type="button"
                                            (click)="abrirInstagram()"
                                            class="bg-purple-600 hover:bg-purple-800 transition-colors
                                                    px-6 py-2 rounded-md font-semibold text-white
                                                    shadow-md flex items-center gap-2"
                                        >
                                            VER MAIS NO INSTAGRAM
                                            <i class="pi pi-instagram"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="fale_conosco" class="flex flex-col md:flex-row justify-between gap-10 p-10 backdrop-blur-md text-white" style="background: linear-gradient(180deg, rgba(26, 13, 52, 1), rgba(26, 13, 52, 0.8))">
                            <!-- Texto -->
                            <div class="w-full md:w-1/2 max-w-xl md:ml-10">
                                <div class="text-[#07bcec] font-[900] mb-6 text-5xl md:text-6xl">Fale Conosco</div>

                                <p class="text-xl md:text-3xl text-white font-light text-justify">
                                    Quer saber mais sobre o Movimento Inovatu? Tem uma ideia, parceria ou sugestão? Estamos aqui para ouvir você! Entre em contato conosco e junte-se à construção de um ecossistema de inovação cada vez mais forte em
                                    Paracatu. Preencha o formulário ou utilize um dos nossos canais de contato abaixo, nossa equipe vai responder com rapidez e atenção para dialogarmos sobre seu projeto, evento ou colaboração.
                                </p>
                            </div>

                            <!-- Formulário -->
                            <form
                                class="flex flex-col gap-4 bg-gradient-to-br from-[#1a0020] to-[#2a0040]
                                        p-6 rounded-xl shadow-lg w-full md:w-1/2 max-w-md border border-purple-700/30 mx-auto text-left"
                                #loginForm="ngForm"
                                (ngSubmit)="faleConosco(loginForm)"
                            >
                                <p class="font-semibold text-sm text-white mb-2">Para entrar em contato com a Inovatu, preencha todos os campos do formulário abaixo:</p>

                                <label class="text-sm font-medium">Nome:</label>
                                <input pInputText name="name" [(ngModel)]="name" placeholder="Nome" required />

                                <label class="text-sm font-medium">E-mail:</label>
                                <input pInputText type="email" name="email" [(ngModel)]="email" placeholder="E-mail" required />

                                <label class="text-sm font-medium">Título do Assunto:</label>
                                <input pInputText name="titulo" [(ngModel)]="titulo" placeholder="Título do Assunto" required />

                                <label class="text-sm font-medium">Mensagem:</label>
                                <textarea pInputText name="message" [(ngModel)]="message" placeholder="Mensagem" rows="5" required></textarea>

                                <p-button type="submit" fluid> ENVIAR </p-button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
    `
})
export class HeroWidget {
    noticiasPorPagina = 3;
    noticias: Poste[] = [];
    eventos: Poste[] = [];
    partners: Partner[] = [];
    name: string = '';
    email: string = '';
    titulo: string = '';
    message: string = '';

    noticiaSelecionada: Poste | null = null;
    constructor(
        private messageService: MessageService,
        private service: PartnerService,
        private router: Router,
        private postagensService: PostagensService,
        private contactService: ContactService,
        private recaptchaService: RecaptchaService
    ) {}

    ngOnInit() {
        this.service.getPartners().subscribe({
            next: (data) => {
                this.partners = data.filter((p) => p.isActive);
            },
            error: (err) => console.error(err)
        });
        this.postagensService.getPostsPublicNoticias(this.noticiasPorPagina).subscribe((posts) => {
            this.noticias = posts;
        });
        this.postagensService.getPostsPublicEventos(this.noticiasPorPagina).subscribe((posts) => {
            this.eventos = posts;
        });
    }

    abrirSite(url: string) {
        if (url) window.open(url, '_blank');
    }

    verMais(rota: string) {
        this.router.navigate([rota]);
    }

    ajuste() {
        return ajustetela();
    }
    abrirDetalhe(noticia: Poste) {
        this.noticiaSelecionada = noticia;
    }

    fecharDetalhe() {
        this.noticiaSelecionada = null;
    }
    abrirInstagram() {
        window.open('https://www.instagram.com/movimento.inovatu/', '_blank');
    }
    async faleConosco(form: NgForm) {
        const token = await this.recaptchaService.execute('enviar_proposta');
        console.log('teste', form);
        const body = {
            name: this.name,
            email: this.email,
            subject: this.titulo,
            message: this.message,
            recaptchaToken: token
        };
        console.log('body', body);
        this.contactService.postSubmitContact(body).subscribe(
            (data: any) => {
                const mensagem = data.message || 'Contato enviado com sucesso.';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: mensagem
                });
                form.resetForm();
            },
            (err) => {
                const mensagem = err.error?.message || 'Erro inesperado.';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Logar',
                    detail: mensagem
                });
            }
        );
    }
}
