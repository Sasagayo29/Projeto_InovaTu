

import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { GoogleTranslateService } from '@/core/service/google-translate.service';

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, TranslatePipe, LanguageSwitcherComponent],
    template: `
        <img src="assets/images/inovatu_branco.png " alt="Inovatu Logo" class="mr-2 sm:h-16 h-16 w-auto mr-[10%]" />
        <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:hidden!" pStyleClass="@next" enterFromClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
            <i class="pi pi-bars text-2xl!"></i>
        </a>

        <div class="items-center bg-[#1a052b] dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'home' })" pRipple class="px-0 py-40 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span class="text-white">HOME</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['Ecossistema'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span class="text-white">{{ 'HOME.ECOSSISTEMA' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'Paceiros' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span class="text-white">{{ 'HOME.PARCEIROS' | translate }}</span>
                    </a>
                </li>
                <li>
                    <!--ok CENTRO DE INOVAÇÃO -->
                    <a (click)="router.navigate(['Centro_de_Inovacao'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span class="text-white">{{ 'HOME.CENTRO-DE-INOVACAO' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['Evento'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span class="text-white">{{ 'HOME.EVENTOS' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/news'])" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span class="text-white">{{ 'HOME.NOTICIAS' | translate }}</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/landing'], { fragment: 'fale_conosco' })" pRipple class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                        <span class="text-white">{{ 'HOME.FALE-CONOSCO' | translate }}</span>
                    </a>
                </li>
            </ul>
            <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                <button pButton pRipple label="Login" routerLink="/auth/login" [rounded]="true" [text]="true"></button>
            </div>
            <div class="translation-flags flex gap-2">
                <app-language-switcher></app-language-switcher>
                <div id="google_translate_element" style="display:none"></div>
                <!--<img src="assets/images/brazil.png" alt="Português" class="w-10 cursor-pointer" (click)="changeLang('pt')" />
                <img src="assets/images/united-states_11873190.png" alt="English" class="w-10 cursor-pointer" (click)="changeLang('en')" -->
            </div>
        </div>
    `
})
export class TopbarWidget {
    constructor(
        public router: Router,
        private translate: TranslateService,
        private googleTranslateService: GoogleTranslateService
    ) {}

    ngOnInit() {
        const savedLang = localStorage.getItem('lang') || 'pt';
        this.translate.setDefaultLang(savedLang);
        this.translate.use(savedLang);
        this.googleTranslateService.load();
    }

    changeLang(lang: 'pt' | 'en') {
        console.log('vlique');
        this.translate.use(lang);
        localStorage.setItem('lang', lang);
    }
}
