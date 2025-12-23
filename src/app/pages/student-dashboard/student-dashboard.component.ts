import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  studentName: string = 'Student';

  // All tests
  tests: any[] = [];

  // Section-wise tests
  listeningTests: any[] = [];
  readingTests: any[] = [];
  writingTests: any[] = [];
  speakingTests: any[] = [];

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tests = this.testService.getTests();

    this.route.queryParams.subscribe(params => {
      const selectedType = params['type'] || null;

      // reset arrays
      this.listeningTests = [];
      this.readingTests = [];
      this.writingTests = [];
      this.speakingTests = [];

      let activeTests = this.tests.filter(t => t.status === 'Active');

      if (selectedType) {
        activeTests = activeTests.filter(t => t.type === selectedType);
      }

      activeTests.forEach(test => {
        switch (test.type) {
          case 'LISTENING':
            this.listeningTests.push(test);
            break;
          case 'READING':
            this.readingTests.push(test);
            break;
          case 'WRITING':
            this.writingTests.push(test);
            break;
          case 'SPEAKING':
            this.speakingTests.push(test);
            break;
        }
      });
    });
  }

  startTest(testId: number) {
    this.router.navigate(['/solve-test', testId]);
  }
}
