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
import { LiveSessionsComponent } from './live-sessions/live-sessions.component';
import { ProgressComponent } from './progress/progress.component';
import { AdminVendorComponent } from './admin-vendor/admin-vendor.component';
import { TestModule } from './test-module/test-module';
import { ImageCroppingComponent } from './image-cropping/image-cropping.component';
import { ZoomHomeComponent } from './zoom/zoom-home/zoom-home.component';
import { ZoomUserComponent } from './zoom/zoom-user/zoom-user.component';
import { ZoomSidebarComponent } from './zoom/zoom-sidebar/zoom-sidebar.component';
import { ZoomDashboardHeaderComponent } from './zoom/zoom-dashboard-header/zoom-dashboard-header.component';
import { LiveSessionComponent } from './zoom/live-session/live-session.component';
import { ZoomSettingComponent } from './zoom/zoom-setting/zoom-setting.component';
import { LiveSessionMessageComponent } from './zoom/live-session-message/live-session-message.component';
import {ProfileUserDetailComponent} from './student-profiles/profile-user-detail/profile-user-detail.component'
import {EditProfileUserDetailComponent} from './student-profiles/edit-profile-user-detail/edit-profile-user-detail.component'
import {StudentChangePasswordComponent} from './student-profiles/student-change-password/student-change-password.component'
import {TeacherProfilesComponent} from './teacher-profile/teacher-profiles/teacher-profiles.component'
import {EditTeacherProfileComponent} from './teacher-profile/edit-teacher-profile/edit-teacher-profile.component'
import {TeacherChangePasswordComponent} from './teacher-profile/teacher-change-password/teacher-change-password.component'

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
    path: 'live-session', component: LiveSessionsComponent
  },
  {
    path: 'progress-bar', component: ProgressComponent
  },
  {
    path: 'admin', component: AdminVendorComponent
  },
  {
    path: 'student_profile', component: ProfileUserDetailComponent
  },
  {
    path: 'profile-change-password', component: StudentChangePasswordComponent
  },
  {
    path: 'edit_student_profile', component: EditProfileUserDetailComponent
  },
  {
    path: 'teacher-profile', component: TeacherProfilesComponent
  },
  {
    path: 'edit_teacher_profile', component: EditTeacherProfileComponent
  },
  {
    path: 'password-change', component: TeacherChangePasswordComponent
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
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar-module.routing').then(m => m.CalendarModule)
  },
  {
    path: 'grade',
    loadChildren: () => import('./grading/grading-setup/grading.module').then(m => m.GradeModule)
  },
  {
    path: 'class-material-vendor',
    loadChildren: () => import('./class-material-vendor/class-material-vendor.module').then(m => m.ClassMaterialVendorModule)
  },
  {
    path: 'admin-sub',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'zoom-home', component: ZoomHomeComponent
  },
  {
    path: 'zoom-user', component: ZoomUserComponent
  },
  {
    path: 'zoom-live-session', component: LiveSessionComponent
  },
  {
    path: 'zoom-setting', component: ZoomSettingComponent
  },
  {
    path: 'zoom-live-message', component: LiveSessionMessageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
