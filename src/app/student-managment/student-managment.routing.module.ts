import { Routes, RouterModule } from '@angular/router';
import { StudentCourseComponent } from './student-course/student-course.component'

const routes: Routes = [
    {
        path: 'student-course', component: StudentCourseComponent
    }
];

export const StudentRoutes = RouterModule.forChild(routes);
