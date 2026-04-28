import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `
    <div class="layout-footer">
        <p>© Copyright 2025 - Todos os direitos reservados <a href="" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">IFTM</a></p>
    </div>`
})
export class AppFooter {}
