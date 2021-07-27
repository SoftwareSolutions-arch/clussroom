import { Routes, RouterModule } from '@angular/router';
import { AssignmentDetailComponent } from './class-assignment/assignment-detail/assignment-detail.component';
import { AssignmentDetailNewComponent } from './class-assignment/assignment-detail-new/assignment-detail-new.component';
import { LearnerAssignmentListingComponent } from './class-assignment/learner-assignment-listing/learner-assignment-listing.component';
import { LearnerAssignmentReviewComponent } from './class-assignment/learner-assignment-review/learner-assignment-review.component';
import { LearnerAssignmentSubmissionComponent } from './class-assignment/learner-assignment-submission/learner-assignment-submission.component'
import { ViewLearnerAssignmentComponent } from './class-assignment/view-learner-assignment/view-learner-assignment.component'
import { LearnerContinueReviewComponent } from './class-assignment/learner-continue-review/learner-continue-review.component';
import { LearnerViewReviewComponent } from './class-assignment/learner-view-review/learner-view-review.component'
import { LearnerStartReviewComponent } from './class-assignment/learner-start-review/learner-start-review.component'
import { LearnerTestComponent } from './test-assignment/learner-test/learner-test.component';
import { LearnerSubmissionComponent } from './test-assignment/learner-submission/learner-submission.component'
import { LearnerCompletionComponent } from './test-assignment/learner-completion/learner-completion.component';
import { LearnerWithoutCompletionComponent } from './test-assignment/learner-without-completion/learner-without-completion.component';
import { LearnerStudentPanelComponent } from './test-assignment/learner-student-panel/learner-student-panel.component';
import { LearnerStudentPanel2Component } from './test-assignment/learner-student-panel2/learner-student-panel2.component'
import { TestViewComponent } from './test-assignment/test-view/test-view.component'
import { CourseLibraryComponent } from './class-library/course-library/course-library.component'
import { EditMainLibraryComponent } from './class-library/edit-main-library/edit-main-library.component'
import { FileTransferComponent } from './class-library/file-transfer/file-transfer.component'
import { MainLibraryComponent } from './class-library/main-library/main-library.component'
import { PersonalLibraryComponent } from './class-library/personal-library/personal-library.component'
import { StudentCourseMaterialComponent } from './student-course-material/student-course-material.component'

const routes: Routes = [

  {
    path: 'assignment-detail', component: AssignmentDetailComponent
  },
  {
    path: 'assignment-detail-new', component: AssignmentDetailNewComponent
  },
  {
    path: 'learner-start-review', component: LearnerStartReviewComponent
  },
  {
    path: 'learner-assignment-listing', component: LearnerAssignmentListingComponent
  },
  {
    path: 'learner-review', component: LearnerAssignmentReviewComponent
  },
  {
    path: 'learner-submission', component: LearnerAssignmentSubmissionComponent
  },
  {
    path: 'view-learner-assignment', component: ViewLearnerAssignmentComponent
  },
  {
    path: 'continue-learner', component: LearnerContinueReviewComponent
  },
  {
    path: 'view-learner', component: LearnerViewReviewComponent
  },
  {
    path: 'learner-test', component: LearnerTestComponent
  },
  {
    path: 'learner-submissions', component: LearnerSubmissionComponent
  },
  {
    path: 'learner-completion', component: LearnerCompletionComponent
  },
  {
    path: 'learner-without-completion', component: LearnerWithoutCompletionComponent
  },
  {
    path: 'learner-student-panel', component: LearnerStudentPanelComponent
  },
  {
    path: 'learner-panel', component: LearnerStudentPanel2Component
  },
  {
    path: 'learner-view', component: TestViewComponent
  },
  {
    path: 'course-library-home', component: CourseLibraryComponent
  },
  {
    path: 'edit-course-library', component: EditMainLibraryComponent
  },
  {
    path: 'file-transfer', component: FileTransferComponent
  },
  {
    path: 'main-library', component: MainLibraryComponent
  },
  {
    path: 'personal-library', component: PersonalLibraryComponent
  },
  {
    path: 'student-course-material', component: StudentCourseMaterialComponent
  }
];

export const ClassMaterialRoutes = RouterModule.forChild(routes);
