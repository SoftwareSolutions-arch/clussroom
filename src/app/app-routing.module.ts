import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricingComponent } from './pricing/pricing.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { SchoolNameComponent } from './school-name/school-name.component';
import { InstructionNameComponent } from './instruction-name/instruction-name.component';
import { HomeComponent } from './home/home.component';
import { ChoosePasswordComponent } from './choose-password/choose-password.component';
import { ThanksScreenComponent } from './thanks-screen/thanks-screen.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OtpComponent } from './otp/otp.component';
import { Sample04Component } from './sample04/sample04.component';
import { DashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { ClassesComponent } from './classes/classes.component';
import {AuthGuardGuard} from './auth-guard.guard';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ClassListComponent } from './class-list/class-list.component';
import { LearnersComponent } from './learners/learners.component';
const routes: Routes = [
  {
    path: 'pricing', component: PricingComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'subscription', component: SubscriptionComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'invoice', component: InvoiceComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'login', component: LoginComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'school-name', component: SchoolNameComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'instruction-name', component: InstructionNameComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'home', component: HomeComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'choose-password', component: ChoosePasswordComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'thanks-screen', component: ThanksScreenComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'contact-us', component: ContactUsComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'about-us', component: AboutUsComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'change-password', component: ChangePasswordComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'footer', component: FooterComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'otp', component: OtpComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'sidebar', component: SidebarComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'sample04', component: Sample04Component,canActivate:[AuthGuardGuard]
  },
  {
    path: 'dashoardheader',component:DashboardheaderComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'classes',component:ClassesComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'classes-list',component:ClassListComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'learners',component:LearnersComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'privacy-policy',component:PrivacyPolicyComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: 'terms-of-use',component:TermsOfUseComponent,canActivate:[AuthGuardGuard]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
