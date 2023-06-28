import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRequestInterceptor } from './interceptors/app.request.interceptor';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RevenueFormComponent } from './revenues/revenue-form/revenue-form.component';
import { RevenueListComponent } from './revenues/revenue-list/revenue-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductComponent } from './products/product/product.component';
import { RouterModule } from '@angular/router';
import { ExpenseFormComponent } from './expenses/expense-form/expense-form.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RevenueFormComponent,
    RevenueListComponent,
    SignUpComponent,
    ProductComponent,
    ExpenseFormComponent,
    ExpenseListComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppRequestInterceptor,
      multi: true
    },
    AuthGuard,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
