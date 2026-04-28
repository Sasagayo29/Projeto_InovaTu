
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';
import { importProvidersFrom } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { pt } from 'primelocale/pt.json';
import { definePreset } from '@primeuix/themes';
import { AuthInterceptor } from '@/core/interceptor/auth.interceptor';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: 'var(--color-seance-50)',
            100: 'var(--color-seance-100)',
            200: 'var(--color-seance-200)',
            300: 'var(--color-seance-300)',
            400: 'var(--color-seance-400)',
            500: 'var(--color-seance-500)',
            600: 'var(--color-seance-600)',
            700: 'var(--color-seance-700)',
            800: 'var(--color-seance-800)',
            900: 'var(--color-seance-900)',
            950: 'var(--color-seance-950)'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptorsFromDi(), withFetch()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        provideAnimationsAsync(),
        providePrimeNG({
            translation: pt,
            theme: {
                preset: MyPreset,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }),
        {
            provide: TRANSLATE_HTTP_LOADER_CONFIG,
            useValue: {
                prefix: './assets/i18n/',
                suffix: '.json'
            }
        },
        importProvidersFrom(
            TranslateModule.forRoot({
                defaultLanguage: 'pt',
                loader: {
                    provide: TranslateLoader,
                    useClass: TranslateHttpLoader
                }
            })
        )
    ]
};
