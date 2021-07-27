import { Routes, RouterModule } from '@angular/router';
import { StudentCalendarComponent } from './student-calendar/student-calendar.component';

const routes: Routes = [
    {
        path: 'student-calendar', component: StudentCalendarComponent
    }
];

export const CalendarRoutes = RouterModule.forChild(routes);