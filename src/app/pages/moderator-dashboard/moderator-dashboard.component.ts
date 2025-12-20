import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moderator-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moderator-dashboard.component.html',
  styleUrls: ['./moderator-dashboard.component.css']
})
export class ModeratorDashboardComponent {
  moderatorName = 'Moderator';
  tests: any[] = [];

  constructor(private router: Router, private testService: TestService) {
    this.tests = this.testService.getTests();
  }

  toggleStatus(index: number) {
    this.testService.toggleStatus(index);
  }

  logout() {
    this.router.navigate(['/']);
  }

  createTest() {
    this.router.navigate(['/create-test']);
  }

editTest(test: any) {
  this.router.navigate(['/create-test', test.id]); // pass id for edit
}

openTestDetails(test: any) {
  this.router.navigate(['/test-details', test.id]); // pass id to view MCQs
}

}
