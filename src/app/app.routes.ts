import { Routes } from '@angular/router';
import { ModeratorDashboardComponent } from './pages/moderator-dashboard/moderator-dashboard.component';
import { CreateTestComponent } from './pages/create-test/create-test.component';
import { TestDetailsComponent } from './pages/test-detail/test-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { StudentSolveTestComponent } from './pages/solve-test/solve-test.component';



export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'moderator-dashboard', component: ModeratorDashboardComponent },
  { path: 'create-test', component: CreateTestComponent }, // for new test
  { path: 'create-test/:id', component: CreateTestComponent }, // for edit
  { path: 'test-details/:id', component: TestDetailsComponent }, // for viewing MCQs
  { path: 'student-dashboard', component: StudentDashboardComponent },
  {
    path: 'solve-test/:id',
    component: StudentSolveTestComponent
  },
  

];