import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { desenvolvedores } from '@/environments/environments.local';

@Component({
    selector: 'app-sobre-nos',
    standalone: true,
    imports: [CommonModule, ButtonModule, CardModule, CarouselModule],
    template: `
        <div class="mt-20 min-h-screen flex flex-col">
            <p-carousel
                [value]="team"
                [numVisible]="6"
                [numScroll]="3"
                [circular]="true"
                [autoplayInterval]="4000"
                [responsiveOptions]="[
                    { breakpoint: '1024px', numVisible: 2, numScroll: 2 },
                    { breakpoint: '768px', numVisible: 1, numScroll: 1 }
                ]"
            >
                <ng-template pTemplate="item" let-dev>
                    <div class="px-4 py-10 h-full">
                        <p-card class="h-full">
                            <ng-template pTemplate="header">
                                <div class="flex flex-col items-center pt-6">
                                    <img [src]="getAvatar(dev.photoUrl)" [alt]="dev.name" class="w-28 h-28 rounded-full border-4 border-indigo-600" />
                                </div>
                            </ng-template>
                            <div class="text-center px-4 pb-4">
                                <h3 class="text-lg font-bold text-slate-800">
                                    {{ dev.name }}
                                </h3>

                                <span class="text-sm font-semibold text-indigo-600 uppercase">
                                    {{ dev.role }}
                                </span>

                                <p class="text-sm text-slate-500 mt-2">
                                    {{ dev.description }}
                                </p>
                            </div>
                            <ng-template pTemplate="footer">
                                <div class="flex justify-center">
                                    <a *ngIf="dev.social.github" [href]="dev.social.github" target="_blank">
                                        <i class="pi pi-github text-xl"></i>
                                    </a>

                                    <a *ngIf="dev.social.linkedin" [href]="dev.social.linkedin" target="_blank">
                                        <i class="pi pi-linkedin text-xl"></i>
                                    </a>

                                    <a *ngIf="dev.social.instagram" [href]="dev.social.instagram" target="_blank">
                                        <i class="pi pi-instagram text-xl"></i>
                                    </a>

                                    <a *ngIf="dev.social.website" [href]="dev.social.website" target="_blank">
                                        <i class="pi pi-globe text-xl"></i>
                                    </a>
                                </div>
                            </ng-template>
                        </p-card>
                    </div>
                </ng-template>
            </p-carousel>
        </div>
    `
})
export class SobreNosComponent {
    team = desenvolvedores;
    getAvatar(name: string): string {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=312e81&color=ffffff&size=150`;
    }
}
