import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { LibraryRoutes } from './library.routing.module';
import { LibrarySidebarComponent } from './library-sidebar/library-sidebar.component';
import { FileTransferComponent } from './file-transfer/file-transfer.component';
import { CourseLibraryComponent } from './course-library/course-library.component';
import { MainLibraryComponent } from './main-library/main-library.component';
import { PersonalLibraryComponent } from './personal-library/personal-library.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LibraryRoutes,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        AngularEditorModule,
        MatProgressSpinnerModule,DragDropModule
    ],
    declarations: [
        FileTransferComponent,
        LibrarySidebarComponent,
        CourseLibraryComponent,
        MainLibraryComponent,
        PersonalLibraryComponent
    ],
})
export class LibraryModule {

}