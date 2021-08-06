import { Routes, RouterModule } from '@angular/router';
import {CourseLibraryComponent} from './course-library/course-library.component';
import {MainLibraryComponent} from './main-library/main-library.component'
import {PersonalLibraryComponent} from './personal-library/personal-library.component'
import {FileTransferComponent} from './file-transfer/file-transfer.component'
import {LibraryHomeComponent} from './library-home/library-home.component'

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
  {
    path: 'library-home', component: LibraryHomeComponent
  },
];

export const LibraryRoutes = RouterModule.forChild(routes);
