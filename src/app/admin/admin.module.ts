import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutes } from './admin.routing.module'
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PermissionRightsComponent } from './permission-rights/permission-rights.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AdminRoutes,
        ReactiveFormsModule,    
        FormsModule,
        NgxPaginationModule,
        AngularEditorModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        SidebarComponent,   
        AdminHomeComponent,
        PermissionRightsComponent
    ],
})
export class AdminModule {

}