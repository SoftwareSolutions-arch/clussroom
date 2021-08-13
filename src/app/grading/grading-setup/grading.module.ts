import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GradeRoutes } from './grading-routing.module';
import {EditGradeSettingComponent} from './vendor-grading/edit-grade-setting/edit-grade-setting.component'
import {FinalGradeScaleSetupComponent} from './vendor-grading/final-grade-scale-setup/final-grade-scale-setup.component'
import {GradeWeightageSettingComponent} from './vendor-grading/grade-weightage-setting/grade-weightage-setting.component'
import {GradingScaleSetupComponent} from './vendor-grading/grading-scale-setup/grading-scale-setup.component'
import {GradingHeaderComponent} from './grading-header/grading-header.component'
import {GradingSidebarComponent} from './grading-sidebar/grading-sidebar.component'
import {GradingDashboardHeaderComponent} from './grading-dashboard-header/grading-dashboard-header.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        AngularEditorModule,
        GradeRoutes,
        MatProgressSpinnerModule
    ],
    declarations: [
        EditGradeSettingComponent,
        FinalGradeScaleSetupComponent,
        GradeWeightageSettingComponent,
        GradingScaleSetupComponent,
        GradingHeaderComponent,
        GradingSidebarComponent,
        GradingDashboardHeaderComponent
    ],
})
export class GradeModule {

}