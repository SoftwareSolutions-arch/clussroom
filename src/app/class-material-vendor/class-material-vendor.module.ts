import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClassMaterialVendorRoutes } from './class-material.routing-vendor.module';

import { MainLibraryComponent } from './main-library/main-library.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        ClassMaterialVendorRoutes,
        NgxPaginationModule,
        AngularEditorModule,
        MatProgressSpinnerModule,
        DragDropModule
    ],
    declarations: [
        MainLibraryComponent,
        SidebarComponent
    ],
})
export class ClassMaterialVendorModule {
}