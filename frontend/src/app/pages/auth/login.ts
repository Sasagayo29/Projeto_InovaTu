import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { authUserService} from '@/core/service/auth-user.service';
import { MessageService } from 'primeng/api';
import { TokenService } from '@/core/service/token.service';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ToastModule],
    providers: [MessageService],
    template: `
        <div class=""></div>
        <p-toast position="bottom-right"></p-toast>

        <div class="relative flex items-center justify-center min-h-screen overflow-hidden font-[Segoe_UI] text-white">
            <img src="assets/images/fundologin-1.png" alt="Fundo login" class="absolute inset-0 w-full h-full object-cover" />
            <div
                class="relative z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.08),rgba(0,0,0,0.45))]
               border border-[rgba(255,255,255,0.08)]
               rounded-2xl backdrop-blur-2xl
               p-16 w-[500px] sm:w-[550px] lg:w-[600px]"
            >
                <img src="assets/images/inovatu_branco.png" alt="Logo Inovatu" class="w-60 mx-auto mb-6 opacity-90" />
                <div class="text-center text-2xl font-bold uppercase tracking-wide text-white py-10">
                    <p>Área de Acesso <span class="text-[#FF2379]">ADMINISTRADOR</span></p>
                </div>
                <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
                    <label for="email" class="block text-base mb-2">E-mail</label>
                    <input pInputText id="email" type="email" placeholder="E-mail" [(ngModel)]="email" name="email" required class="w-full p-4 rounded-md border-none mb-5 text-gray-900 shadow-inner focus:ring-2 focus:ring-[#5c00d4]" />
                    <label for="senha" class="block text-base mb-2">Senha</label>
                    <p-password id="password1" [(ngModel)]="password" name="password" placeholder="Senha" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false" required></p-password>
                    <div class="flex items-center mt-10 gap-4 justify-end w-full">
                        <p-button type="submit" styleClass="w-full text-lg py-3" class="w-full" label="ACESSAR"></p-button>
                    </div>
                </form>
            </div>
        </div>
    `
})
export class Login {
    email: string = '';
    password: string = '';
    checked: boolean = false;
    loading: boolean = false;

    constructor(
        private authUserService: authUserService,
        private messageService: MessageService,
        private tokenService: TokenService,
        private router: Router
    ) {}

    login(form: any): void {
        if (form.valid) {
            this.loading = true;
            this.authUserService.login(this.email, this.password).subscribe(
                (res: any) => {
                    console.log('token', res);
                    this.tokenService.save(res.token);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Login realizado com sucesso'
                    });
                    form.resetForm();
                    this.loading = false;
                    this.router.navigate(['Contatos']);
                },
                (error) => {
                    this.loading = false;
                    const mensagem = error.error?.message || 'Erro inesperado.';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro ao Logar',
                        detail: mensagem
                    });
                }
            );
        }
    }
}
