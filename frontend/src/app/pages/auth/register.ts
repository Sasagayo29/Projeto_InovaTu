import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, MessageModule, ToastModule],
    providers: [MessageService],
    template: `
        <p-toast position="bottom-right"></p-toast>
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center w-full">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)" class="mb:w-4/5">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-4xl font-medium mb-4">Cadastar</div>
                        </div>
                        <div>
                            <label for="nome1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Nome</label>
                            <input pInputText id="nome1" type="text" placeholder="Nome" class="w-full md:w-120 mb-2" [(ngModel)]="nome" />
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" type="text" placeholder="Email" class="w-full md:w-120 mb-2" [(ngModel)]="email" />
                            <label for="cpf1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Cpf</label>
                            <input pInputText id="cpf1" type="text" placeholder="cpf" class="w-full md:w-120 mb-2" [(ngModel)]="cpf" />
                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                            <p-password id="password1" [(ngModel)]="password" placeholder="Senha" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"></label>
                            <p-password id="password1" [(ngModel)]="confirmPassword" placeholder="Digite a senha novamente" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                           <!-- <p-button type="submit" label="Cadastra" styleClass="w-full" (click)="registrar()" [loading]="loading"></p-button>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Register {
    nome: string = '';
    email: string = '';
    cpf: string = '';
    password: string = '';
    confirmPassword: string = '';
    loading: boolean = false;

    // constructor(
    //     private createUserService: CreateUserService,
    //     private router: Router,
    //     private messageService: MessageService
    // ) {}

    // registrar(): void {
    //     this.createUserService.register(this.nome, this.email, this.password, this.cpf).subscribe({
    //         next: (res) => {
    //             this.loading = true;
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Sucesso',
    //                 detail: 'Operação realizada com sucesso!'
    //             });
    //             setTimeout(() => this.router.navigate(['/auth/login']), 1000);
    //         },
    //         error: (err) => {
    //             this.loading = false;
    //             const mensagem = err.error?.mensagem || 'Erro inesperado.';
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: `Erro ao cadastrar`,
    //                 detail: mensagem
    //             });
    //         }
    //     });
    // }
}
