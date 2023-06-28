import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _locale: BehaviorSubject<string> = new BehaviorSubject<string>('pt-BR');

  get locale(): string {
    return this._locale.value;
  }

  set locale(value: string) {
    this._locale.next(value);
  }

  constructor() { }
}
