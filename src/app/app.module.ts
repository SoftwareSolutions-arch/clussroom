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
import { ClassListComponent } from './class-list/class-list.component';
import { LearnersComponent } from './learners/learners.component';
import { StorageComponent } from './storage/storage.component';
import { AdminComponent } from './admin/admin.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CalendarComponent } from './calendar/calendar.component';
import { ProgressComponent } from './progress/progress.component';
import { ToastrModule } from 'ngx-toastr';

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
    PasswordStrengthComponent,
    ClassListComponent,
    LearnersComponent,
    StorageComponent,
    AdminComponent,
    LiveSessionsComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    CalendarComponent,
    ProgressComponent
  ],
  imports: [CommonModule,
    BrowserModule, ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,MatInputModule,MatTableModule,
    MatProgressSpinnerModule,
    SlickCarouselModule,MatTabsModule,NgxPaginationModule,AngularEditorModule
  ],
  providers: [Sample04Component,ClassesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
