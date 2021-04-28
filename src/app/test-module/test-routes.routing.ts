import { Routes, RouterModule } from '@angular/router';
import { TestListingHomeComponent } from './test-listing-home/test-listing-home.component';
import { SettingsComponent } from './settings/settings.component';
import { TestAssessmentComponent } from './test-assessment/test-assessment.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { QuestionScreenComponent } from './question-screen/question-screen.component';
import { FillInTheBlanksComponent } from './fill-in-the-blanks/fill-in-the-blanks.component';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question/multiple-choice-question.component';
import { ShortAnswerComponent } from './short-answer/short-answer.component';
import { OrderingComponent } from './ordering/ordering.component';
import { TrueOrFalseComponent } from './true-or-false/true-or-false.component';

const routes: Routes = [
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
];

export const TestRoutes = RouterModule.forChild(routes);
