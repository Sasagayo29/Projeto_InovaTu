import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, Toast],
    providers: [DialogService, MessageService],
    template: `
        <p-toast />
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];
    hasStock = false;
    hasService = false;
    hasFinance = false;
    ref: DynamicDialogRef | undefined;

    constructor(
        //  private tokenService: TokenService,
        private router: Router,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {
        // this.hasStock = tokenService.hasStock();
        // this.hasService = tokenService.hasService();
        // this.hasFinance = tokenService.hasFinance();
    }

    logout() {
        // this.tokenService.remove();
        this.router.navigate(['/auth/login']);
    }

    ngOnInit() {
        this.model = [
            // {
            //     label: 'Home',
            //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['Dashboard'] }]
            // },
            {
                label: 'contatos',
                items: [{ label: 'Gerencia Contatos', icon: 'pi pi-clipboard', routerLink: ['Contatos'] }]
            },
            {
                label: 'Reservas',
                items: [{ label: 'Gerencia Reservas', icon: 'pi pi-file-plus', routerLink: ['Reservas'] }]
            },
            {
                label: 'Gerenciamento de Parceiros',

                items: [
                {label: 'Proposta Parceiros', icon: 'pi pi-file-plus', routerLink: ['Propostas'] },
                { label: 'Criar Parceiros', icon: 'pi pi-file-plus', routerLink: ['Criar_Parceiros']}
                ]
                

            },
            {
                label: 'Postagens',
                icon: 'pi-file-export',
                items: [{ label: 'Criar Postagem', icon: 'pi pi-wallet', routerLink: ['Criar_Postagens'] }]
            },
            {
                label: 'Salas',
                icon: 'pi-file-export',
                items: [{ label: 'Criar Salas', icon: 'pi pi-calendar-clock', routerLink: ['Criar_Salas'] }]
            },
            {
                label: 'Sair',
                items: [{ label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }]
            }
        ];
    }
}
