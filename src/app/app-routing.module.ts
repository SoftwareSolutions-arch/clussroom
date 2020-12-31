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

const routes: Routes = [
  {
    path: 'pricing', component: PricingComponent
  },
  {
    path: 'subscription', component: SubscriptionComponent
  },
  {
    path: 'invoice', component: InvoiceComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'school-name', component: SchoolNameComponent
  },
  {
    path: 'instruction-name', component: InstructionNameComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'choose-password', component: ChoosePasswordComponent
  },
  {
    path: 'thanks-screen', component: ThanksScreenComponent
  },
   {
    path: 'contact-us', component: ContactUsComponent
  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'change-password', component: ChangePasswordComponent
  },
  {
    path: 'footer', component: FooterComponent
  },
  {
    path: '', redirectTo: '/pricing', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/pricing', pathMatch: 'full'
  },
  // {
  //   path: '', redirectTo: '/login', pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
