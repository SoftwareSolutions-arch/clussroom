import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component'
import { PermissionRightsComponent } from './permission-rights/permission-rights.component'

const routes: Routes = [
    {
        path: 'admin-home', component: AdminHomeComponent
    },
    {
        path: 'permission-rights', component: PermissionRightsComponent
    }
];

export const AdminRoutes = RouterModule.forChild(routes);