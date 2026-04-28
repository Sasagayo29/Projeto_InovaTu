import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    imports: [RouterModule],
    template: `
        <div id="footer" class=" bg-gradient-to-t from-[#0c0010] to-[#1a0020] text-gray-300 p-8  flex flex-wrap justify-between items-center gap-10">

  <div class="max-w-xs ">
    <img src="/assets/images/inovatu_branco.png" alt="Inovatur" class="mr-2 sm:h-16 h-16 w-auto mr-[10%]">
    <div class="mt-4">
        <p class=" text-sm text-white">
          Inovação. Conectando pessoas para um futuro melhor.
        </p>
    </div>
  </div>
  <div class="flex flex-col gap-3 p-8 ">
    <div class="flex items-center gap-2">
      <i class="pi pi-instagram text-fuchsia-500"></i>
      <a href="https://www.instagram.com/movimento.inovatu/" target="_blank" class="hover:underline">Instagram: movimento.inovatu</a>
      <span></span>
    </div>
    <div class="flex items-center gap-2">
      <i class="pi pi-map-marker text-fuchsia-500"></i>
      <a href="https://www.google.com/maps/place/ADESP-+Ag%C3%AAncia+de+Desenvolvimento+Sustent%C3%A1vel+de+Paracatu/@-17.2230971,-46.8745073,17z/data=!3m1!4b1!4m6!3m5!1s0x94a84a7c1b2273a5:0x15a7766e871def46!8m2!3d-17.2230971!4d-46.8745073!16s%2Fg%2F1ptyq6sks?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="hover:underline">
         Endereço: ADESP- Agência de Desenvolvimento Sustentável de Paracatu
      </a>
    </div>

     <div class="flex items-center gap-2">
      <i class="pi pi-whatsapp text-fuchsia-500"></i>
      <a href="https://chat.whatsapp.com/GkL8tuACi1RL9SozcqCejG" target="_blank" class="hover:underline">
         Faça parte da nossa coimunidade no Whatsapp
      </a>
    </div>
    <div class="flex items-center gap-2">
      <i class="pi pi-envelope text-fuchsia-500"></i>
        <a href="mailto:inovatu.paractu@gmail.com">
          e-mail para contato: inovatu.paractu@gmail.com
        </a>
    </div>
    <div class="flex items-center gap-2 cursor-pointer">
  <i class="pi pi-id-card text-fuchsia-500"></i>
  <a routerLink="/Devs"
    class="hover:underline">
    Time de Desenvolvimento Inovatu
  </a>
</div>
  </div>

  <div class="text-xs text-white">
    <p>Políticas de Privacidade</p>
    <p class="mt-1">
      Se precisar de mais ícones, colocar depois. Verificar se é melhor deixar branco.
    </p>
  </div>


</div>
    `
})
export class FooterWidget {
    constructor(public router: Router) {}
}
