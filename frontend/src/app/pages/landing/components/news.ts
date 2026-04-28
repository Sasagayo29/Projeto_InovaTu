import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Poste } from '@/core/types/noticia.interface';
import { PostagensService } from '@/core/service/Posts.service';
import { DetalheComponent } from "./detalhe-noticia";

@Component({
    selector: 'app-pagina-noticia',
    standalone: true,
    imports: [ButtonModule, CommonModule, FormsModule, DetalheComponent],
    template: `
        @if (!noticiaSelecionada) {
            <div class=" h-full  p-10 min-h-screen flex flex-col" style="background: linear-gradient(0deg, rgba(26,13,52))  ">
                <div class="py-20 px-[5%] mx-auto text-center pb-80  " style="background: linear-gradient(0deg, rgb(34,4,63))">
                    <h1 class="!text-[#ff2379] text-5xl font-extrabold mb-2 uppercase">PORTAL DE NOTÍCIAS</h1>
                    <p class="text-xl text-white/90 mb-16">Últimas notícias, comunicados e acontecimentos do ecossistema Inovatu.</p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        @if (this.noticias.length > 0) {
                            @for (noticia of this.noticias; track noticia.id) {
                                <section
                                    class="p-5 rounded-xl overflow-hidden bg-[#460f87] transition duration-300 ease-in-out
                                    hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/50"
                                    (click)="abrirDetalhe(noticia)"
                                >
                                    <div class="w-full h-48 rounded-lg mb-4 overflow-hidden bg-white/10 bg-cover bg-center">
                                        <img class="w-full h-full object-cover" [src]="noticia.imageUrls" [alt]="noticia.title" />
                                    </div>

                                    <div class="flex flex-col gap-2 flex-1">
                                        <h2 class="text-2xl leading-[1.3] text-white!">{{ noticia.title }}</h2>
                                       <!-- <p class="text-lg text-white/75 leading-[1.4] text-justify">{{ noticia.content }}</p> -->
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
                        <p-button (click)="verMais()" size="large" [disabled]="this.pesquisar" class=" text-white font-extrabold uppercase tracking-wide "> CARREGAR MAIS NOTÍCIAS </p-button>
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
export class PaginaNoticia implements OnInit {
    todasNoticias: Poste[] = [];
    noticias: Poste[] = [];
    paginaAtual = 1;
    filtro = '';
    noticiasPorPagina = 3;
    totalPaginas = 0;
    totalNoticias = 0;
    noticiaSelecionada: Poste | null = null;
    pesquisar: boolean = false;
    constructor(private postagensService: PostagensService) {}

    ngOnInit(): void {
        this.verMais();
    }

    aplicarPaginacao(totalNoticias: number) {
        const inicio = this.noticias.length;

        if (inicio >= totalNoticias) {
            this.pesquisar = true;
            return;
        }

        const fim = Math.min(inicio + this.noticiasPorPagina, totalNoticias);

        const novos = this.todasNoticias.slice(inicio, fim);

        console.log('inicio:', inicio, 'fim:', fim, 'novos:', novos.length);

        this.noticias = [...this.noticias, ...novos];
    }

    verMais() {
        this.postagensService.getPostsPublicNoticias(this.noticiasPorPagina).subscribe((posts) => {
            this.todasNoticias = posts;
            this.totalNoticias = this.todasNoticias.length;
            this.aplicarPaginacao(this.totalNoticias);
            this.noticiasPorPagina = this.noticiasPorPagina + 3;
        });
    }

    abrirDetalhe(noticia: Poste) {
        this.noticiaSelecionada = noticia;
    }

    fecharDetalhe() {
        this.noticiaSelecionada = null;
    }
}
