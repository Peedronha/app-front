import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { I18nService } from '../services/translations/i18n.service';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  currentDate: Date = new Date();
  errorMessage?: string;

  currentLanguage: string = 'pt'; // idioma padrão

  constructor(
    public i18nService: I18nService,
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  // INTERNACIONALIZACAO
  changeLanguage(language: string, event: Event): void {
    event.preventDefault();
    this.i18nService.setCurrentLanguage(language);
  }

  getTranslation(key: string): string {
    return this.i18nService.getTranslation(key);
  }

  registerUser() {

    // verifica se o usuário já possui um ID
    if(this.user.id) {
      this.errorMessage = 'ID já foi atribuído ao usuário.';
      return;
    }

    // validar campo
    if (!this.validateFields()) {
      return;
    }

    // data de cadastro
    // this.user.registrationDate = new Date();

    // enviar os dados do usuário para o servidor
    this.userService.registerUser(this.user).subscribe(
      {
        next: (response) => {
          console.log('Usuário cadastrado com sucesso!', response);
          this.user = new User();
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar usuário: ', error);
          this.errorMessage = 'Erro ao cadastrar usuário.';
        }
      }
    );

  }

  validateFields(): boolean {
    // verificar se os campos foram todos preenchidos
    if (!this.user.name || !this.user.email || !this.user.password) {
        // !this.user.confirmPassword || !this.user.dateOfBirth) {
      alert('Todos os campos devem ser preenchidos!');
      return false;
    }


    // verifica se a senha possui no mínimo 8 caracteres
    if (this.user.password) {
      alert('A senha deve ter no mínimo 8 caracteres.');
      return false;
    }

    // verifica se a senha e a confirmação são iguais
    if (this.user.password !== this.user.password) {
      alert('A senha e a confirmação de senha devem ser iguais.');
      return false;
    }

    return true;

  }

}
