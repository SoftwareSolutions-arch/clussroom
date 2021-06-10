import { Routes, RouterModule } from '@angular/router';
import {CourseLibraryComponent} from './course-library/course-library.component';
import {MainLibraryComponent} from './main-library/main-library.component'
import {PersonalLibraryComponent} from './personal-library/personal-library.component'
import {FileTransferComponent} from './file-transfer/file-transfer.component'

const routes: Routes = [
  {
    path: 'personal-library', component: PersonalLibraryComponent
  },
  {
    path: 'course-library', component: CourseLibraryComponent
  },
  {
    path: 'main-library', component: MainLibraryComponent
  },
  {
    path: 'file-transfer', component: FileTransferComponent
  },
];

export const LibraryRoutes = RouterModule.forChild(routes);
