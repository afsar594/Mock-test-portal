import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../services/test.service';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-solve-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class StudentSolveTestComponent implements OnInit, OnDestroy {

  test: any;
  answers: any = {};
  score = 0;
  submitted = false;

  totalTime = 0;
  timeLeft = 0;
  timer: any;

  studentName = 'Student'; // later login se aa sakta hai

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.test = this.testService.getTests().find(t => t.id === id && t.status === 'Active');

    if (!this.test) {
      this.router.navigate(['/student-dashboard']);
      return;
    }

    this.totalTime = this.test.questions.length * this.test.timePerQuestion;
    this.timeLeft = this.totalTime;

    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.submitTest();
      }
    }, 1000);
  }

  submitTest() {
    if (this.submitted) return;

    clearInterval(this.timer);

    this.score = 0;

    this.test.questions.forEach((q: any, i: number) => {
      if (this.answers[i] === q.correct) {
        this.score++;
      }
    });

    const total = this.test.questions.length;
    const percentage = Math.round((this.score / total) * 100);
    const status = percentage >= 50 ? 'PASS' : 'FAIL';

    // 📧 SEND RESULT TO MODERATOR EMAIL
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: 'saminatahir986@gmail.com',
        student_name: this.studentName,
        test_name: this.test.name,
        marks: `${this.score} / ${total}`,
        percentage: percentage + '%',
        result: status
      },
      'YOUR_PUBLIC_KEY'
    ).then(() => {
      console.log('Result email sent to moderator');
    });

    this.submitted = true;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
