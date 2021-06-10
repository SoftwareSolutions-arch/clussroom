import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AssignmentDetailComponent} from './class-assignment/assignment-detail/assignment-detail.component';
import {AssignmentDetailNewComponent} from './class-assignment/assignment-detail-new/assignment-detail-new.component';
import {LearnerAssignmentListingComponent} from './class-assignment/learner-assignment-listing/learner-assignment-listing.component';
import {LearnerAssignmentReviewComponent} from './class-assignment/learner-assignment-review/learner-assignment-review.component';
import {LearnerAssignmentSubmissionComponent} from './class-assignment/learner-assignment-submission/learner-assignment-submission.component'
import {ViewLearnerAssignmentComponent} from './class-assignment/view-learner-assignment/view-learner-assignment.component';
import {ClassDashboardHeaderComponent} from './class-dashboard-header/class-dashboard-header.component';
import {LearnerContinueReviewComponent} from './class-assignment/learner-continue-review/learner-continue-review.component';
import {LearnerViewReviewComponent} from './class-assignment/learner-view-review/learner-view-review.component'
import {LearnerStartReviewComponent} from './class-assignment/learner-start-review/learner-start-review.component'
import {ClassHeaderComponent} from './class-header/class-header.component';
import {ClassSidebarComponent } from './class-sidebar/class-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ClassMaterialRoutes } from './class-material.routing.module';

@NgModule({
    imports : [
        CommonModule,
        RouterModule,
        ClassMaterialRoutes,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        AngularEditorModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        AssignmentDetailComponent,
        LearnerContinueReviewComponent,
        LearnerStartReviewComponent,
        AssignmentDetailNewComponent,
        LearnerViewReviewComponent,
        LearnerAssignmentListingComponent,
        LearnerAssignmentReviewComponent,
        LearnerAssignmentSubmissionComponent,
        ViewLearnerAssignmentComponent,
        ClassDashboardHeaderComponent,
        ClassHeaderComponent,
        ClassSidebarComponent
    ],
})
export class ClassMaterialModule{

}