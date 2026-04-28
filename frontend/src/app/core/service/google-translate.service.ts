import { Injectable } from '@angular/core';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleTranslateService {

  load(): void {
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'pt',
          includedLanguages: 'pt,en,es',
          autoDisplay: false
        },
        'google_translate_element'
      );

      this.removeBannerForever();
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }

  private removeBannerForever(): void {
    const observer = new MutationObserver(() => {
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        banner.remove();
        document.body.style.top = '0px';
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}
