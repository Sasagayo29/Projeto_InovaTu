import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { InnovationCenterComponent } from '@/pages/landing/components/innovation-center';
import { Layout } from '@/pages/landing/layout-public';
import { AgendarSalaComponent } from '@/pages/landing/components/agendar-sala-component';
import { PaginaNoticia } from '@/pages/landing/components/news';
import { EcossistemaComponent } from '@/pages/landing/components/EcossistemaComponent';
import { CriarParceiro } from '@/pages/criar-parceiro/criar-parceiro';
import { Postagens } from '@/pages/postagens/postagens';
import { SalasAdmin } from '@/pages/criar-salas/criar-salas';
import { AdminBookingsComponent } from '@/pages/reservas/AdminBookingsComponent';
import { PaginaEventos } from '@/pages/landing/components/eventos';
import { Contacts } from '@/pages/contacts/contacts';
import { proposais } from '@/pages/proposais/proposais';
import { SobreNosComponent } from '@/pages/landing/components/sobre_nos.component';

export const appRoutes: Routes = [
    // layout público
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'landing', pathMatch: 'full' },
            { path: 'landing', component: Landing },
            { path: 'Centro_de_Inovacao', component: InnovationCenterComponent },
            { path: 'AgendarSala', component: AgendarSalaComponent },
            { path: 'news', component: PaginaNoticia },
            { path: 'Evento', component: PaginaEventos },
            { path: 'Ecossistema', component: EcossistemaComponent },
            { path: 'Devs', component: SobreNosComponent }
        ]
    },
    // layout administrativo
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'Dashboard', component: Dashboard },
            { path: 'Criar_Parceiros', component: CriarParceiro },
            { path: 'Criar_Postagens', component: Postagens },
            { path: 'Criar_Salas', component: SalasAdmin },
            { path: 'Reservas', component: AdminBookingsComponent },
            { path: 'Contatos', component: Contacts },
            { path: 'Propostas', component: proposais },

            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },

    // rotas auxiliares
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
