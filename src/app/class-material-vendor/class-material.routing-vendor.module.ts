import { Routes, RouterModule } from '@angular/router';
import { MainLibraryComponent } from './main-library/main-library.component';

const routes: Routes = [
  {
    path: 'main-library', component: MainLibraryComponent
  }
];

export const ClassMaterialVendorRoutes = RouterModule.forChild(routes);
