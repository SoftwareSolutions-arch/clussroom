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
import { CalendarComponent } from './calendar/calendar.component';
import { StorageComponent } from './storage/storage.component';
import { LoaderComponent } from './loader/loader.component';
import { AdminComponent } from './admin/admin.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions.component';
import { ProgressComponent } from './progress/progress.component';
import { TestListingComponent } from './test-listing/test-listing.component';
import { TestListingHomeComponent } from './test-module/test-listing-home/test-listing-home.component';
import { SettingsComponent } from './test-module/settings/settings.component';
import { TestAssessmentComponent } from './test-module/test-assessment/test-assessment.component';
import { SettingsTabComponent } from './test-module/settings-tab/settings-tab.component';
import { QuestionScreenComponent } from './test-module/question-screen/question-screen.component';
import { FillInTheBlanksComponent } from './test-module/fill-in-the-blanks/fill-in-the-blanks.component';
import { MultipleChoiceQuestionComponent } from './test-module/multiple-choice-question/multiple-choice-question.component';
import { ShortAnswerComponent } from './test-module/short-answer/short-answer.component';
import { OrderingComponent } from './test-module/ordering/ordering.component';
import { TrueOrFalseComponent } from './test-module/true-or-false/true-or-false.component';

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
    path: 'calendar', component: CalendarComponent
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
  {
    path: 'test-listing-home', component: TestListingHomeComponent
  },
  {
    path: 'test-settings', component: SettingsComponent
  },
  {
    path: 'test-assessment', component: TestAssessmentComponent
  },
  {
    path: 'settings-tabs', component: SettingsTabComponent
  },
  {
    path: 'question-screen', component: QuestionScreenComponent
  },
  {
    path: 'fill-in-the-blanks', component: FillInTheBlanksComponent
  },
  {
    path: 'multiple-choice', component: MultipleChoiceQuestionComponent
  },
  {
    path: 'short-answer', component: ShortAnswerComponent
  },
  {
    path: 'ordering', component: OrderingComponent
  },
  {
    path: 'true-false', component: TrueOrFalseComponent
  },
  // { path: 'action', loadChildren: './test-module/test-module#TestModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
