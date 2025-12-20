import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailsComponent implements OnInit {
  test: any;

  // form control
  showAddForm = false;

  questionText = '';
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  correctAnswer = '';

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.test = this.testService.getTests().find(t => t.id === id);
  }

  openAddQuestion() {
    this.showAddForm = true;
  }

  addQuestion() {
    if (
      !this.questionText ||
      !this.optionA ||
      !this.optionB ||
      !this.optionC ||
      !this.optionD ||
      !this.correctAnswer
    ) return;

    const newQuestion = {
      question: this.questionText,
      options: {
        A: this.optionA,
        B: this.optionB,
        C: this.optionC,
        D: this.optionD
      },
      correct: this.correctAnswer
    };

    this.test.questions.push(newQuestion);

    // clear only question form
    this.questionText = '';
    this.optionA = '';
    this.optionB = '';
    this.optionC = '';
    this.optionD = '';
    this.correctAnswer = '';

    this.showAddForm = false;
  }
}
