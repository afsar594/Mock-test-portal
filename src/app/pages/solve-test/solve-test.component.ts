import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-solve-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class SolveTestComponent implements OnInit {

  test: any;
  answers: any = {};
  submitted = false;

  // Timer
  timeLeft: number = 0; // in seconds
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.test = this.testService.getTestById(id);

    if (!this.test || this.test.status !== 'Active') {
      alert('Test not available');
      this.router.navigate(['/student-dashboard']);
      return;
    }

    // Initialize timer
    this.timeLeft = this.test.duration * 60;
    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        this.submitTest();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2,'0')}`;
  }

  submitTest() {
    if (this.submitted) return; // prevent double submit
    this.submitted = true;
    clearInterval(this.timerInterval);
  }
}
