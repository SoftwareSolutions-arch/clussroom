import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TestAssessmentHomeComponent} from './test-assessment-home/test-assessment-home.component'
import {AddTestAssestmentComponent} from './add-test-assestment/add-test-assestment.component'
import { AssessmentRoutes } from './test-assesment.routing.module';
import {AssignmentHeaderComponent} from './assignment-header/assignment-header.component';
import {AssignmentSettingComponent} from './assignment-setting/assignment-setting.component'
import {AssignmentQuestionComponent} from './assignment-question/assignment-question.component'
import {AssignmentResultComponent } from './assignment-result/assignment-result.component'
import {AssignmentDetailComponent} from './assignment-detail/assignment-detail.component'
import {AssignmentDetailNewComponent} from './assignment-detail-new/assignment-detail-new.component'
import {AssignmentDashboardHeaderComponent} from './assignment-dashboard-header/assignment-dashboard-header.component'
import {SidebarAssignmentComponent} from './sidebar-assignment/sidebar-assignment.component'
import {AssignmentReviewComponent} from './assignment-review/assignment-review.component'
import {AssignmentReviewRubricComponent} from './assignment-review-rubric/assignment-review-rubric.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {Edit_assignmentComponent} from './edit_assignment/edit_assignment.component'
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
    imports : [
        CommonModule,
        RouterModule,
        AssessmentRoutes,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        AngularEditorModule
    ],
    declarations: [
        TestAssessmentHomeComponent,
        AddTestAssestmentComponent,
        AssignmentHeaderComponent,
        AssignmentSettingComponent,
        AssignmentQuestionComponent,
        AssignmentResultComponent,
        AssignmentDetailComponent,
        AssignmentDetailNewComponent,
        AssignmentDashboardHeaderComponent,
        SidebarAssignmentComponent,
        AssignmentReviewComponent,
        AssignmentReviewRubricComponent,
        Edit_assignmentComponent
    ],
})
export class AssessmentModule{

}