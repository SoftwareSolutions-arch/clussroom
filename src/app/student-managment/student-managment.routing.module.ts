import { Routes, RouterModule } from '@angular/router';
import { StudentCourseComponent } from './student-course-dashbaord/student-course.component'
import { StudentHeaderComponent } from './student-header/student-header.component'

const routes: Routes = [
    {
        path: 'student-course', component: StudentCourseComponent
    },
    {
        path: 'student-header', component: StudentHeaderComponent
    }
];

export const StudentRoutes = RouterModule.forChild(routes);
