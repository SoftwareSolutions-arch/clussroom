import { Routes, RouterModule } from '@angular/router';
import {TestAssessmentHomeComponent} from './test-assessment-home/test-assessment-home.component'
import {AddTestAssestmentComponent} from './add-test-assestment/add-test-assestment.component'
import {AssignmentSettingComponent} from './assignment-setting/assignment-setting.component'
import {AssignmentQuestionComponent} from './assignment-question/assignment-question.component'
import {AssignmentResultComponent } from './assignment-result/assignment-result.component'
import {AssignmentDetailComponent} from './assignment-detail/assignment-detail.component'
import {AssignmentDetailNewComponent} from './assignment-detail-new/assignment-detail-new.component'
import {AssignmentHeaderComponent} from './assignment-header/assignment-header.component';
import {AssignmentReviewComponent} from './assignment-review/assignment-review.component'
import {AssignmentReviewRubricComponent} from './assignment-review-rubric/assignment-review-rubric.component'

const routes: Routes = [
  {
    path: 'test-assignment-home', component: TestAssessmentHomeComponent
  },
  {
    path: 'add-assignment', component: AddTestAssestmentComponent
  },
  {
    path: 'assignment-setting', component: AssignmentSettingComponent
  },
  {
    path: 'assignment-question', component: AssignmentQuestionComponent
  },
  {
    path: 'assignment-result', component: AssignmentResultComponent
  },
  {
    path: 'assignment-details', component: AssignmentDetailComponent
  },
  {
    path: 'assignment-detail-new', component: AssignmentDetailNewComponent
  },
  {
    path: 'assignment-header', component: AssignmentHeaderComponent
  },
  {
    path: 'assignment-review', component: AssignmentReviewComponent
  },
  {
    path: 'assignment-review-rubric', component: AssignmentReviewRubricComponent
  },
];

export const AssessmentRoutes = RouterModule.forChild(routes);
