import { Routes } from '@angular/router';
import { ModeratorDashboardComponent } from './pages/moderator-dashboard/moderator-dashboard.component';
import { CreateTestComponent } from './pages/create-test/create-test.component';
import { TestDetailsComponent } from './pages/test-detail/test-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { SolveTestComponent } from './pages/solve-test/solve-test.component';
import { HomeComponent } from './pages/home/home.component';
import { IeltsWritingComponent } from './pages/ielts-writing/ielts-writing.component';
import { IeltsListeningComponent } from './pages/ielts-listening/ielts-listening.component';
import { IeltsReadingComponent } from './pages/ielts-reading/ielts-reading.component';
import { IeltsSpeakingComponent } from './pages/ielts-speaking/ielts-speaking.component';
import { FaqComponent } from './pages/faq/faq.component';
import { WhyChooseUsComponent } from './pages/why-choose-us/why-choose-us.component';
import { IeltsTipsComponent } from './pages/ielts-tips/ielts-tips.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';



export const routes: Routes = [
  {path:'' , component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'moderator-dashboard', component: ModeratorDashboardComponent },
  { path: 'create-test', component: CreateTestComponent }, // for new test
  { path: 'create-test/:id', component: CreateTestComponent }, // for edit
  { path: 'test-details/:id', component: TestDetailsComponent }, // for viewing MCQs
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'solve-test/:id', component: SolveTestComponent },
{ path: 'ielts-writing', component: IeltsWritingComponent },
{ path: 'ielts-listening', component: IeltsListeningComponent },
{ path: 'ielts-reading', component: IeltsReadingComponent },
{ path: 'ielts-speaking', component: IeltsSpeakingComponent },
{path:'faq' , component:FaqComponent},
{
  path: 'why-choose-us',
  component: WhyChooseUsComponent
},
{path:'ielts-tips' , component:IeltsTipsComponent},
{ path: 'about-us', component: AboutUsComponent },
  
  { path: '**', redirectTo: '' }

];