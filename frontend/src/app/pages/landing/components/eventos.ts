import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Poste } from '@/core/types/noticia.interface';
import { PostagensService } from '@/core/service/Posts.service';
import { DetalheComponent } from "./detalhe-noticia";

@Component({
    selector: 'app-pagina-evento',
    standalone: true,
    imports: [ButtonModule, CommonModule, FormsModule, DetalheComponent],
    template: `
        @if (!noticiaSelecionada) {
            <div class="min-h-screen flex flex-col p-10" style="background: linear-gradient(0deg, rgba(26,13,52)) ">
                <div class="py-20 px-[5%] mx-auto text-center pb-80  " style="background: linear-gradient(0deg, rgb(34,4,63))">
                    <h1 class="!text-[#ff2379] text-5xl font-extrabold mb-2 uppercase">PORTAL DE EVENTOS</h1>
                    <p class="text-xl text-white/90 mb-16">Últimos Eventos, do ecossistema Inovatu.</p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        @if (this.eventos.length > 0) {
                            @for (noticia of this.eventos; track noticia.id) {
                                <section
                                    class="p-5 rounded-xl overflow-hidden bg-[#460f87] transition duration-300 ease-in-out
                                    hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/50"
                                    (click)="abrirDetalhe(noticia)"
                                >
                                    <div class="w-full rounded-lg mb-4 overflow-hidden bg-white/10 bg-cover bg-center">
                                        <img class="w-full h-full object-cover" [src]="noticia.imageUrls" [alt]="noticia.title" />
                                    </div>

                                    <div class="flex flex-col gap-2 flex-1">
                                        <h2 class="text-2xl leading-[1.3] text-white!">{{ noticia.title }}</h2>
                                     <!--   <p class="text-lg text-white/75 leading-[1.4] text-justify">{{ noticia.content }}</p> -->
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
                            <p class="text-center text-white">Nenhuma Evento encontrada.</p>
                        }
                    </div>
                    <div class="text-center mt-6">
                        <p-button (click)="verMais()" size="large" [disabled]="this.pesquisar" class=" text-white font-extrabold uppercase tracking-wide "> CARREGAR MAIS EVENTOS </p-button>
                    </div>
                </div>
            </div>
        }
        @if (noticiaSelecionada) {
            <app-detalhe *ngIf="noticiaSelecionada" [noticiaSelecionada]="noticiaSelecionada" (voltar)="fecharDetalhe()">
            </app-detalhe>
        }
    `
})
export class PaginaEventos implements OnInit {
    todasNoticias: Poste[] = [];
    eventos: Poste[] = [];
    paginaAtual = 1;
    filtro = '';
    eventoPorPagina = 3;
    totalPaginas = 0;
    totaleventos = 0;
    noticiaSelecionada: Poste | null = null;
    pesquisar: boolean = false;
    constructor(private postagensService: PostagensService) {}

    ngOnInit(): void {
        this.verMais();
    }

    aplicarPaginacao(totaleventos: number) {
        const inicio = this.eventos.length;

        if (inicio >= totaleventos) {
            this.pesquisar = true;
            return;
        }

        const fim = Math.min(inicio + this.eventoPorPagina, totaleventos);

        const novos = this.todasNoticias.slice(inicio, fim);

        console.log('inicio:', inicio, 'fim:', fim, 'novos:', novos.length);

        this.eventos = [...this.eventos, ...novos];
    }

    verMais() {
        this.postagensService.getPostsPublicEventos(this.eventoPorPagina).subscribe((posts) => {
            this.todasNoticias = posts;
            this.totaleventos = this.todasNoticias.length;
            this.aplicarPaginacao(this.totaleventos);
            this.eventoPorPagina = this.eventoPorPagina + 3;
        });
    }

    abrirDetalhe(noticia: Poste) {
        this.noticiaSelecionada = noticia;
    }

    fecharDetalhe() {
        this.noticiaSelecionada = null;
    }
}
