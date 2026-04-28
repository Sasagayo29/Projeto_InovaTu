import { GoogleTranslateService } from '@/core/service/google-translate.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-language-switcher',
    template: `
        <!-- Obrigatório para o Google Translate -->
        <div id="google_translate_element" style="display:none"></div>
        <div class="flex gap-4 justify-center">
            <img src="assets/images/brasil-1.png" alt="Português" class="w-10 cursor-pointer" (click)="changeLang('pt')" />
            <img src="assets/images/eua-1.png" alt="English" class="w-10  cursor-pointer" (click)="changeLang('en')" />
        </div>
    `
})
export class LanguageSwitcherComponent implements OnInit {
    constructor(private googleTranslateService: GoogleTranslateService) {}

    ngOnInit(): void {
        // 👇 Aqui é o carregamento
        this.googleTranslateService.load();
    }

    changeLang(lang: string): void {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;

        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
        }
    }
}
