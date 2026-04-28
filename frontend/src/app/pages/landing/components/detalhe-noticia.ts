import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'app-detalhe',
    standalone: true,
    imports: [CommonModule, ButtonModule, EditorModule],
    template: `
        <div class="min-h-screen text-white px-6 lg:px-28 py-12" style="background: linear-gradient(0deg, rgb(34, 4, 63))">
            <div class="max-w-6xl mx-auto space-y-12 bg-[#1e0531] px-6 py-6">
                <div class="mb-6">
                    <p-button (click)="fecharDetalhe()" size="large" icon=""> Voltar tela</p-button>
                </div>
                <div>
                    <span class="uppercase text-purple-300 tracking-wide text-xl">
                        {{ noticiaSelecionada.postType }}
                    </span>

                    <p class="text-lg opacity-70 mt-1">
                        {{ noticiaSelecionada.publishedAt | date: 'dd/MM/yyyy' }}
                    </p>
                </div>
                <div class="flex justify-center items-center text-center flex-col">
                    <p class="text-4xl lg:text-6xl font-extrabold text-white">
                        {{ noticiaSelecionada.title }}
                    </p>

                    <div class="w-120 rounded-lg overflow-hidden bg-white/10 bg-cover bg-center mb-6">
                        <img [src]="noticiaSelecionada.imageUrls" [alt]="noticiaSelecionada.title" class="w-full h-full object-cover" />
                    </div>

                <div class="w-full max-w-full break-words overflow-hidden leading-relaxed opacity-90 whitespace-pre-line lg:text-3xl"
                    [innerHTML]="noticiaSelecionada.content">
                    </div>
                </div>

                <div class="flex justify-between items-center border-t border-white/10 pt-2">
                    <p class="text-lg font-semibold p-4 text-[#ff2379]">Compartilhe esta notícia:</p>

                    <div class="flex gap-3">
                        <a class="bg-[#0A66C2] w-12 h-12 flex items-center justify-center text-white rounded-full font-semibold"> In </a>
                        <a class="bg-[#25D366] w-12 h-12 flex items-center justify-center text-white rounded-full font-semibold"> WA </a>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class DetalheComponent {
    @Input() noticiaSelecionada: any;
    @Output() voltar = new EventEmitter<void>();

    fecharDetalhe() {
        this.voltar.emit();
    }
}
