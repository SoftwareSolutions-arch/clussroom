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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatInputModule} from '@angular/material/input';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OtpComponent } from './otp/otp.component';
import * as $ from 'jquery';
import { Sample04Component } from './sample04/sample04.component';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { DashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { CoursesComponent } from './courses/courses.component';
import { ClassesComponent } from './classes/classes.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table';
import {CookieService} from 'ngx-cookie-service';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';

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
    ThanksScreenComponent,
    ContactUsComponent,
    AboutUsComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    FooterComponent,
    SidebarComponent,
    OtpComponent,
    Sample04Component,
    DeletePopupComponent,
    DashboardheaderComponent,
    CoursesComponent,
    ClassesComponent,
    PasswordStrengthComponent
  ],
  imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,MatInputModule,MatTableModule,
    MatProgressSpinnerModule,
    SlickCarouselModule,MatTabsModule,NgxPaginationModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
