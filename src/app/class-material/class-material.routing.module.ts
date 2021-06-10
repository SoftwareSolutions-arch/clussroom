import { Routes, RouterModule } from '@angular/router';
import {AssignmentDetailComponent} from './class-assignment/assignment-detail/assignment-detail.component';
import {AssignmentDetailNewComponent} from './class-assignment/assignment-detail-new/assignment-detail-new.component';
import {LearnerAssignmentListingComponent} from './class-assignment/learner-assignment-listing/learner-assignment-listing.component';
import {LearnerAssignmentReviewComponent} from './class-assignment/learner-assignment-review/learner-assignment-review.component';
import {LearnerAssignmentSubmissionComponent} from './class-assignment/learner-assignment-submission/learner-assignment-submission.component'
import {ViewLearnerAssignmentComponent} from './class-assignment/view-learner-assignment/view-learner-assignment.component'
import {LearnerContinueReviewComponent} from './class-assignment/learner-continue-review/learner-continue-review.component';
import {LearnerViewReviewComponent} from './class-assignment/learner-view-review/learner-view-review.component'
import {LearnerStartReviewComponent} from './class-assignment/learner-start-review/learner-start-review.component'

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
  }

];

export const ClassMaterialRoutes = RouterModule.forChild(routes);
