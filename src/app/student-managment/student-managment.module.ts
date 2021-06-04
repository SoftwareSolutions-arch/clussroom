import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { StudentCourseComponent } from './student-course-dashbaord/student-course.component';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component'
import { StudentHeaderComponent } from './student-header/student-header.component'
import { StudentRoutes } from './student-managment.routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        AngularEditorModule,
        StudentRoutes,
        MatProgressSpinnerModule
    ],
    declarations: [
        StudentCourseComponent,
        StudentSidebarComponent,
        StudentHeaderComponent
    ],
})
export class StudentModule {

}