import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  tests: any[] = [];
  selectedTest: any = null;
  showQuestions = false;
  showQuestionForm = false;
  editIndex: number | null = null;

  testName = '';
  timePerQuestion = 10;
  totalMarks = '';
  passingMarks = '';

  questionText = '';
  optionA = '';
  optionB = '';
  optionC = '';
  optionD = '';
  correctAnswer = '';

  constructor(private testService: TestService, private route: ActivatedRoute) {
    this.tests = this.testService.getTests();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const testId = Number(id);
      this.selectedTest = this.tests.find(t => t.id === testId);
      if (this.selectedTest) {
        this.showQuestions = this.selectedTest.questions.length > 0;
        this.testName = this.selectedTest.name;
        this.timePerQuestion = this.selectedTest.timePerQuestion;
        this.totalMarks = this.selectedTest.totalMarks;
        this.passingMarks = this.selectedTest.passingMarks;
      }
    }
  }

  canCreateTest(): boolean {
    return this.testName.trim() !== '' && this.timePerQuestion > 0 &&
           this.totalMarks !== '' && this.passingMarks !== '';
  }

  isQuestionFormValid(): boolean {
    return this.questionText.trim() !== '' &&
           this.optionA.trim() !== '' &&
           this.optionB.trim() !== '' &&
           this.optionC.trim() !== '' &&
           this.optionD.trim() !== '' &&
           this.correctAnswer !== '';
  }

  createNewTest() {
    this.selectedTest = {
      id: Date.now(),
      name: this.testName,
      timePerQuestion: this.timePerQuestion,
      totalMarks: this.totalMarks,
      passingMarks: this.passingMarks,
      status: 'Inactive',
      questions: []
    };
    this.showQuestions = false; // hide initially until first question added
  }

  addQuestion() {
    if (!this.selectedTest || !this.isQuestionFormValid()) return;

    const q = {
      question: this.questionText,
      options: { A: this.optionA, B: this.optionB, C: this.optionC, D: this.optionD },
      correct: this.correctAnswer
    };

    if (this.editIndex !== null) {
      this.selectedTest.questions[this.editIndex] = q;
      this.editIndex = null;
    } else {
      this.selectedTest.questions.push(q);
    }

    this.clearForm();
    this.showQuestions = true; // show added questions after first add
    this.showQuestionForm = false; // hide form
  }

  editQuestion(index: number) {
    const q = this.selectedTest.questions[index];
    this.questionText = q.question;
    this.optionA = q.options.A;
    this.optionB = q.options.B;
    this.optionC = q.options.C;
    this.optionD = q.options.D;
    this.correctAnswer = q.correct;
    this.editIndex = index;
    this.showQuestionForm = true;
  }

  openTest(test: any) {
    this.selectedTest = test;
    this.showQuestions = test.questions.length > 0;
    this.showQuestionForm = false;
    this.testName = test.name;
    this.timePerQuestion = test.timePerQuestion;
    this.totalMarks = test.totalMarks;
    this.passingMarks = test.passingMarks;
    this.clearForm();
  }

  finalSaveTest() {
    if (!this.selectedTest || this.selectedTest.questions.length === 0) return;

    const index = this.tests.findIndex(t => t.id === this.selectedTest.id);
    if (index > -1) {
      this.tests[index] = this.selectedTest;
    } else {
      this.testService.addTest(this.selectedTest);
    }

    this.resetAll();
  }

  deleteQuestion(index: number) {
    this.selectedTest.questions.splice(index, 1);
    if (this.selectedTest.questions.length === 0) this.showQuestions = false;
  }

  deleteTest(index: number) {
    this.testService.deleteTest(index);
    this.selectedTest = null;
    this.showQuestions = false;
    this.showQuestionForm = false;
  }

  clearForm() {
    this.questionText = '';
    this.optionA = '';
    this.optionB = '';
    this.optionC = '';
    this.optionD = '';
    this.correctAnswer = '';
    this.editIndex = null;
  }

  resetAll() {
    this.selectedTest = null;
    this.testName = '';
    this.timePerQuestion = 10;
    this.totalMarks = '';
    this.passingMarks = '';
    this.showQuestions = false;
    this.showQuestionForm = false;
    this.clearForm();
  }
}
