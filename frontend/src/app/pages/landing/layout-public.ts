import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarWidget } from './components/topbarwidget.component';
import { FooterWidget } from "./components/footerwidget";
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-layout',
    imports: [RouterModule, TopbarWidget, FooterWidget, TooltipModule],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900 min-h-screen">
            <div class="z-50 fixed top-0 left-0 w-full z-20 bg-[#1a052b] shadow-md">
                <topbar-widget class="py-6 px-0 mx-0 md:mx-12 lg:mx-0 lg:px-20 flex items-center justify-between" />
            </div>
            <div class="pt-[96px] z-40">
                <router-outlet></router-outlet>
            </div>
            <div class="z-20 fixed bottom-4 right-30">
                <a href="https://chat.whatsapp.com/GkL8tuACi1RL9SozcqCejG">
                    <img src="assets/images/whats2.png " alt="Logo whatsaap" class="h-20 w-auto " pTooltip="Faça parte da nossa comunidade no Whatsapp" />
                </a>
            </div>
            <div class="z-40">
                <footer-widget />
            </div>
        </div>
    `
})
export class Layout {}
