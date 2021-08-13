import { Routes, RouterModule } from '@angular/router';
import {EditGradeSettingComponent} from './vendor-grading/edit-grade-setting/edit-grade-setting.component'
import {FinalGradeScaleSetupComponent} from './vendor-grading/final-grade-scale-setup/final-grade-scale-setup.component'
import {GradeWeightageSettingComponent} from './vendor-grading/grade-weightage-setting/grade-weightage-setting.component'
import {GradingScaleSetupComponent} from './vendor-grading/grading-scale-setup/grading-scale-setup.component'

const routes: Routes = [
{
    path: 'grade-rubric', component: GradeWeightageSettingComponent
},
{
    path: 'grade-scale', component: GradingScaleSetupComponent
},
{
    path: 'final-grade', component: FinalGradeScaleSetupComponent
},
{
    path: 'edit-final-grade', component: EditGradeSettingComponent
}
];

export const GradeRoutes = RouterModule.forChild(routes);
