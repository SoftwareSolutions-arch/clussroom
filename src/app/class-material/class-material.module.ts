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
import {LearnerTestComponent} from './test-assignment/learner-test/learner-test.component';
import {LearnerSubmissionComponent} from './test-assignment/learner-submission/learner-submission.component';
import {LearnerCompletionComponent} from './test-assignment/learner-completion/learner-completion.component';
import {LearnerWithoutCompletionComponent} from './test-assignment/learner-without-completion/learner-without-completion.component';
import {LearnerStudentPanelComponent} from './test-assignment/learner-student-panel/learner-student-panel.component';
import {LearnerStudentPanel2Component} from './test-assignment/learner-student-panel2/learner-student-panel2.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import {TestViewComponent} from './test-assignment/test-view/test-view.component'
import {CourseLibraryComponent} from './class-library/course-library/course-library.component'
import {EditMainLibraryComponent} from './class-library/edit-main-library/edit-main-library.component'
import {FileTransferComponent} from './class-library/file-transfer/file-transfer.component'
import {MainLibraryComponent} from './class-library/main-library/main-library.component'
import {PersonalLibraryComponent} from './class-library/personal-library/personal-library.component'
@NgModule({
    imports : [
        CommonModule,
        RouterModule,
        ClassMaterialRoutes,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        AngularEditorModule,
        MatProgressSpinnerModule,
        DragDropModule
    ],
    declarations: [
        AssignmentDetailComponent,
        LearnerStudentPanelComponent,
        LearnerStudentPanel2Component,
        LearnerContinueReviewComponent,
        LearnerTestComponent,
        LearnerCompletionComponent,
        LearnerWithoutCompletionComponent,
        LearnerSubmissionComponent,
        LearnerStartReviewComponent,
        AssignmentDetailNewComponent,
        LearnerViewReviewComponent,
        LearnerAssignmentListingComponent,
        LearnerAssignmentReviewComponent,
        LearnerAssignmentSubmissionComponent,
        ViewLearnerAssignmentComponent,
        ClassDashboardHeaderComponent,
        ClassHeaderComponent,
        ClassSidebarComponent,
        TestViewComponent,
        CourseLibraryComponent,
        EditMainLibraryComponent,
        FileTransferComponent,
        MainLibraryComponent,
        PersonalLibraryComponent
    ],
})
export class ClassMaterialModule{

}