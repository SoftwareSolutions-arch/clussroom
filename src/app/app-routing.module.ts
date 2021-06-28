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
import { AuthGuardGuard } from './auth-guard.guard';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ClassListComponent } from './class-list/class-list.component';
import { LearnersComponent } from './learners/learners.component';
import { StorageComponent } from './storage/storage.component';
import { LoaderComponent } from './loader/loader.component';
import { AdminComponent } from './admin/admin.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions.component';
import { ProgressComponent } from './progress/progress.component';
import { TestModule } from './test-module/test-module';
import { ImageCroppingComponent } from './image-cropping/image-cropping.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
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
    path: 'image', component: ImageCroppingComponent
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
    path: 'otp', component: OtpComponent
  },
  {
    path: 'sidebar', component: SidebarComponent
  },
  {
    path: 'sample04', component: Sample04Component
  },
  {
    path: 'dashoardheader', component: DashboardheaderComponent
  },
  {
    path: 'classes', component: ClassesComponent
  },
  {
    path: 'classes-list', component: ClassListComponent
  },
  {
    path: 'learners', component: LearnersComponent
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent
  },
  {
    path: 'terms-of-use', component: TermsOfUseComponent
  },
  {
    path: 'storage', component: StorageComponent
  },
  {
    path: 'loader', component: LoaderComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'live-session', component: LiveSessionsComponent
  },
  {
    path: 'progress-bar', component: ProgressComponent
  },
  { path: 'test', loadChildren: './test-module/test-module#TestModule' },
  {
    path: 'assignment',
    loadChildren: () => import('../app/test-assessment/test-assesment.module').then(m => m.AssessmentModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student-managment/student-managment.module').then(m => m.StudentModule)
  },
  {
    path: 'class-material',
    loadChildren: () => import('./class-material/class-material.module').then(m => m.ClassMaterialModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)
  },
  {
    path: 'image',
    loadChildren: () => import('./image-cropper/image-cropper.module').then(m => m.ImageCropperModule)
  },
  {
    path: 'class-material',
    loadChildren: () => import('./class-material/class-material.module').then(m => m.ClassMaterialModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
