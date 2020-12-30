import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { PricingComponent } from './pricing/pricing.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChoosePasswordComponent } from './choose-password/choose-password.component';
import { HomeComponent } from './home/home.component';
import { InstructionNameComponent } from './instruction-name/instruction-name.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SchoolNameComponent } from './school-name/school-name.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ThanksScreenComponent } from './thanks-screen/thanks-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PricingComponent,
    ChoosePasswordComponent,
    HomeComponent,
    InstructionNameComponent,
    InvoiceComponent,
    SchoolNameComponent,
    SubscriptionComponent,
    ThanksScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
