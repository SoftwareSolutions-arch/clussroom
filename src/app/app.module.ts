import {enableProdMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ImageCropperModule } from 'ngx-image-cropper';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './login/login.component';
import { PricingComponent } from './pricing/pricing.component';
import { ChoosePasswordComponent } from './choose-password/choose-password.component';
import { HomeComponent } from './home/home.component';
import { InstructionNameComponent } from './instruction-name/instruction-name.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SchoolNameComponent } from './school-name/school-name.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ThanksScreenComponent } from './thanks-screen/thanks-screen.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OtpComponent } from './otp/otp.component';
import { Sample04Component } from './sample04/sample04.component';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { DashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { CoursesComponent } from './courses/courses.component';
import { ClassesComponent } from './classes/classes.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { ClassListComponent } from './class-list/class-list.component';
import { LearnersComponent } from './learners/learners.component';
import { StorageComponent } from './storage/storage.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ProgressComponent } from './progress/progress.component';
import { LoaderComponent } from './loader/loader.component';
import { TestListingHomeComponent } from './test-module/test-listing-home/test-listing-home.component';
import { SettingsComponent } from './test-module/settings/settings.component';
import { TestAssessmentComponent } from './test-module/test-assessment/test-assessment.component';
import { SettingsTabComponent } from './test-module/settings-tab/settings-tab.component';
import { QuestionScreenComponent } from './test-module/question-screen/question-screen.component';
import { FillInTheBlanksComponent } from './test-module/fill-in-the-blanks/fill-in-the-blanks.component';
import { MatchingComponent } from './test-module/matching/matching.component';
import { MultipleChoiceQuestionComponent } from './test-module/multiple-choice-question/multiple-choice-question.component';
import { OrderingComponent } from './test-module/ordering/ordering.component';
import { TrueOrFalseComponent } from './test-module/true-or-false/true-or-false.component';
import { ShortAnswerComponent } from './test-module/short-answer/short-answer.component';
import { ReorderScreenComponent } from './test-module/reorder-screen/reorder-screen.component';
import { MidtermPreviewComponent } from './test-module/midterm-preview/midterm-preview.component';
import { EditPointsScreenComponent } from './test-module/edit-points-screen/edit-points-screen.component';
import { AppDashboardHeaderComponent } from './test-module/app-dashboard-header/app-dashboard-header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './test-module/calendar/calendar.component';
import { ImageCroppingComponent } from './image-cropping/image-cropping.component';

// import { DynaformModule } from 'dynaform';
// import { ColorPickerModule } from 'ngx-color-picker';
// import { LineComponent } from './components/line/line.component';
// import { CircleComponent } from './components/circle/circle.component';
// import { RectangleComponent } from './components/rectangle/rectangle.component';
// import { DynamicSvgDirective } from './directives/dynamic-svg.directive';
// import { ShapeComponent } from './components/shape/shape.component';
// import { SquareComponent } from './components/square/square.component';
// import { EllipseComponent } from './components/ellipse/ellipse.component';
// import { TextComponent } from './components/text/text.component';
// import { GroupComponent } from './components/group/group.component';
// import { ImageComponent } from './components/image/image.component';
// import { PolyLineComponent } from './components/polyline/polyline.component';
// import { PathComponent } from './components/path/path.component';

import { StudentCalendarComponent } from './calendar/student-calendar/student-calendar.component';
import { AdminVendorComponent } from './admin-vendor/admin-vendor.component';
import { ZoomHomeComponent } from './zoom/zoom-home/zoom-home.component';
import { ZoomUserComponent } from './zoom/zoom-user/zoom-user.component';
import { ZoomSidebarComponent } from './zoom/zoom-sidebar/zoom-sidebar.component';
import { ZoomDashboardHeaderComponent } from './zoom/zoom-dashboard-header/zoom-dashboard-header.component';
import { LiveSessionComponent } from './zoom/live-session/live-session.component';
import { ZoomSettingComponent } from './zoom/zoom-setting/zoom-setting.component';
import { LiveSessionMessageComponent } from './zoom/live-session-message/live-session-message.component';
import { ProfileUserDetailComponent } from './student-profiles/profile-user-detail/profile-user-detail.component'
import { EditProfileUserDetailComponent } from './student-profiles/edit-profile-user-detail/edit-profile-user-detail.component'
import { StudentChangePasswordComponent } from './student-profiles/student-change-password/student-change-password.component'
import { TeacherProfilesComponent } from './teacher-profile/teacher-profiles/teacher-profiles.component'
import { EditTeacherProfileComponent } from './teacher-profile/edit-teacher-profile/edit-teacher-profile.component'
import { TeacherChangePasswordComponent } from './teacher-profile/teacher-change-password/teacher-change-password.component'
import { TimeZoneService } from './teacher-profile/time-zone.service';
import { TeacherProfileSidebarComponent } from './teacher-profile/teacher-profile-sidebar/teacher-profile-sidebar.component';
import { SidebarStudentComponent } from './student-profiles/sidebar-student/sidebar-student.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])
// enableProdMode();

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
    LiveSessionsComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    ProgressComponent,
    TestListingHomeComponent,
    SettingsComponent,
    TestAssessmentComponent,
    SettingsTabComponent,
    QuestionScreenComponent,
    FillInTheBlanksComponent,
    MatchingComponent,
    MultipleChoiceQuestionComponent,
    OrderingComponent,
    TrueOrFalseComponent,
    ShortAnswerComponent,
    ReorderScreenComponent,
    MidtermPreviewComponent,
    EditPointsScreenComponent,
    AppDashboardHeaderComponent,
    CalendarComponent,
    ImageCroppingComponent,
    //  LineComponent,
    //   CircleComponent,
    //   RectangleComponent,
    //   DynamicSvgDirective,
    //   ShapeComponent,
    //   SquareComponent,
    //   EllipseComponent,
    //   TextComponent,
    //   GroupComponent,
    //   ImageComponent, 
    //   PolyLineComponent,
    //   PathComponent,
    StudentCalendarComponent,
    AdminVendorComponent,
    ZoomHomeComponent, ZoomUserComponent,
    LiveSessionMessageComponent,
    ZoomSettingComponent,
    LiveSessionComponent,
    ZoomDashboardHeaderComponent,
    ZoomSidebarComponent,
    ProfileUserDetailComponent,
    EditProfileUserDetailComponent,
    StudentChangePasswordComponent,
    TeacherProfilesComponent,
    EditTeacherProfileComponent,
    TeacherChangePasswordComponent,
    TeacherProfileSidebarComponent,
    SidebarStudentComponent
  ],
  imports: [
    FullCalendarModule,
    NgxImageZoomModule,
    ImageCropperModule,
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      onActivateTick: true
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule, MatInputModule, MatTableModule, DragDropModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    SlickCarouselModule,
    MatTabsModule,
    NgxPaginationModule,
    AngularEditorModule,
    // DynaformModule,
    // ColorPickerModule,
  ],
  entryComponents: [
    // ShapeComponent,
    // LineComponent,
    // CircleComponent,
    // RectangleComponent,
    // SquareComponent,
    // EllipseComponent,
    // TextComponent,
    // GroupComponent,
    // ImageComponent,
    // PolyLineComponent,
    // PathComponent,
  ],
  providers: [Sample04Component, ClassesComponent, LoaderComponent, { provide: 'TimeZoneService', useClass: TimeZoneService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
