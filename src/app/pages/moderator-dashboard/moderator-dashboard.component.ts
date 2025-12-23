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

  listeningTests: any[] = [];
  readingTests: any[] = [];
  writingTests: any[] = [];
  speakingTests: any[] = [];

  constructor(private router: Router, private testService: TestService) {}

  ngOnInit() {
    const allTests = this.testService.getTests();
    this.listeningTests = allTests.filter(t => t.type === 'LISTENING');
    this.readingTests   = allTests.filter(t => t.type === 'READING');
    this.writingTests   = allTests.filter(t => t.type === 'WRITING');
    this.speakingTests  = allTests.filter(t => t.type === 'SPEAKING');
  }

toggleStatus(test: any) {
  this.testService.toggleStatusById(test.id);
}

  logout() {
    this.router.navigate(['/']);
  }

  createTest() {
    this.router.navigate(['/create-test']);
  }

  editTest(test: any) {
    this.router.navigate(['/create-test', test.id]);
  }

  openTestDetails(test: any) {
  this.router.navigate(['/test-details', test.id]);
}

}
