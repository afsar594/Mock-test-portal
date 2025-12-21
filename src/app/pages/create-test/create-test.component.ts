import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent {

  test = {
    id: Date.now(),
    name: '',
    totalMarks: 40,
    passingMarks: 20,
    duration: 30,
    type: '',
    status: 'Active',
    content: null as any
  };

  // LISTENING
  listening = {
    recordings: [
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] }
    ]
  };

  // READING
  reading = [
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] }
  ];

  // WRITING (HTML ke match)
  writing = {
    task1: '',
    task2: ''
  };

  // SPEAKING (HTML ke match)
  speaking = {
    part1: [{ q: '' }],
    part2: '',
    part3: [{ q: '' }]
  };

  constructor(private testService: TestService) {}

  addQuestion(list: any[]) {
    list.push({ q: '' });
  }

  removeQuestion(list: any[], index: number) {
    list.splice(index, 1);
  }

  /* 🔐 COMPLETE VALIDATION */
  isFormComplete(): boolean {

    if (!this.test.name || !this.test.type) return false;

    if (this.test.type === 'LISTENING') {
      return this.listening.recordings.every(r =>
        r.audio.trim().length > 0 &&
        r.questions.every(q => q.q.trim().length > 0)
      );
    }

    if (this.test.type === 'READING') {
      return this.reading.every(p =>
        p.passage.trim().length > 0 &&
        p.questions.every(q =>
          q.q.trim().length > 0 &&
          q.answer.trim().length > 0
        )
      );
    }

    if (this.test.type === 'WRITING') {
      return (
        this.writing.task1.trim().length > 0 &&
        this.writing.task2.trim().length > 0
      );
    }

    if (this.test.type === 'SPEAKING') {
      return (
        this.speaking.part1.every(q => q.q.trim().length > 0) &&
        this.speaking.part2.trim().length > 0 &&
        this.speaking.part3.every(q => q.q.trim().length > 0)
      );
    }

    return false;
  }

  saveTest() {
    if (!this.isFormComplete()) {
      alert('Please complete all questions before saving the test.');
      return;
    }

    this.test.content =
      this.test.type === 'LISTENING' ? this.listening :
      this.test.type === 'READING'   ? this.reading :
      this.test.type === 'WRITING'   ? this.writing :
      this.speaking;

    this.testService.saveTest(this.test);
    alert('Test saved successfully!');
  }
}
