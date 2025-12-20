import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  activeTests: any[] = [];

  constructor(private testService: TestService, private router: Router) {
    this.activeTests = this.testService
      .getTests()
      .filter(test => test.status === 'Active');
  }

  startTest(test: any) {
    this.router.navigate(['/solve-test', test.id]);
  }


studentName = '';

ngOnInit() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.studentName = user.name;
}

}
