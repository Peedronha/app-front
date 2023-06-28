import { Injectable } from '@angular/core';
import { en } from 'src/app/translations/en';
import { pt } from 'src/app/translations/pt';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private translations: any = {
    pt,
    en
  }

  private currentLanguage: string = 'pt';

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setCurrentLanguage(language: string): void {
    this.currentLanguage = language;
  }

  getTranslation(key: string): string {
    const translation = this.translations[this.currentLanguage];
    if (translation && translation[key]) {
      return translation[key];
    }
    return key; // Retorna a própria chave se a tradução não for encontrada
  }

}
