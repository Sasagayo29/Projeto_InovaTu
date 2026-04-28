// recaptcha.service.ts
import { keyRecaptcha } from '@/environments/environments.local';
import { Injectable } from '@angular/core';

declare const grecaptcha: any;

@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  execute(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!grecaptcha) {
        reject('reCAPTCHA não carregado');
        return;
      }

      grecaptcha.ready(() => {
        grecaptcha
          .execute(keyRecaptcha.key, { action })
          .then((token: string) => resolve(token))
          .catch(reject);
      });
    });
  }
}
