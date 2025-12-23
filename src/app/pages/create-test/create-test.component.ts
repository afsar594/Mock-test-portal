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

  allTests: any[] = [];
  isEditMode = false;

  test: any = this.emptyTest();

  /* ================= LISTENING ================= */
  listening: any = {
    recordings: [
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] }
    ]
  };

  /* ================= READING ================= */
  reading: any[] = [
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] }
  ];

  /* ================= WRITING ================= */
  writing: any = {
    task1: '',
    task2: '',
    
  };

  /* ================= SPEAKING ================= */
  speaking: any = {
    part1: [{ q: '' }],
    part2: '',
    part3: [{ q: '' }]
  };

  constructor(private testService: TestService) {
    this.testService.tests$.subscribe(tests => {
      this.allTests = tests;
    });
  }

  /* ================= ADD / REMOVE QUESTIONS ================= */
  addQuestion(list: any[]) {
    list.push({ q: '' });
  }

  removeQuestion(list: any[], index: number) {
    list.splice(index, 1);
  }

  /* ================= VALIDATION ================= */
  isFormComplete(): boolean {
    if (!this.test.name || !this.test.type) return false;

    if (this.test.type === 'LISTENING') {
      return this.listening.recordings.every((r: any) =>
        r.audio.trim().length > 0 &&
        r.questions.every((q: any) => q.q.trim().length > 0)
      );
    }

    if (this.test.type === 'READING') {
      return this.reading.every((p: any) =>
        p.passage.trim().length > 0 &&
        p.questions.every((q: any) =>
          q.q.trim().length > 0 && q.answer.trim().length > 0
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
        this.speaking.part1.every((q: any) => q.q.trim().length > 0) &&
        this.speaking.part2.trim().length > 0 &&
        this.speaking.part3.every((q: any) => q.q.trim().length > 0)
      );
    }

    return false;
  }

  /* ================= SAVE / UPDATE ================= */
  saveTest() {
    if (!this.isFormComplete()) {
      alert('Please complete all fields');
      return;
    }

    this.test.content =
      this.test.type === 'LISTENING' ? this.listening :
      this.test.type === 'READING'   ? this.reading :
      this.test.type === 'WRITING'   ? this.writing :
      this.speaking;

    this.testService.saveTest(this.test);

    alert(this.isEditMode ? 'Test updated successfully' : 'Test saved successfully');
    this.resetForm();
  }

  /* ================= EDIT TEST ================= */
  editTest(id: number) {
    const found = this.testService.getTestById(id);
    if (!found) return;

    this.isEditMode = true;
    this.test = JSON.parse(JSON.stringify(found));

    if (found.type === 'LISTENING') this.listening = JSON.parse(JSON.stringify(found.content));
    if (found.type === 'READING')   this.reading   = JSON.parse(JSON.stringify(found.content));
    if (found.type === 'WRITING')   this.writing   = JSON.parse(JSON.stringify(found.content));
    if (found.type === 'SPEAKING')  this.speaking  = JSON.parse(JSON.stringify(found.content));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ================= DELETE TEST ================= */
  deleteTest(id: number) {
    if (!confirm('Are you sure you want to delete this test?')) return;
    this.testService.deleteTest(id);
  }

  /* ================= RESET FORM ================= */
  resetForm() {
    this.isEditMode = false;
    this.test = this.emptyTest();

    this.listening = {
      recordings: [
        { audio: '', questions: [{ q: '' }] },
        { audio: '', questions: [{ q: '' }] },
        { audio: '', questions: [{ q: '' }] },
        { audio: '', questions: [{ q: '' }] }
      ]
    };

    this.reading = [
      { passage: '', questions: [{ q: '', answer: '' }] },
      { passage: '', questions: [{ q: '', answer: '' }] },
      { passage: '', questions: [{ q: '', answer: '' }] }
    ];

    this.writing = { task1: '', task2: '' };
    this.speaking = { part1: [{ q: '' }], part2: '', part3: [{ q: '' }] };
  }

  /* ================= EMPTY TEST ================= */
  emptyTest() {
    return {
      id: Date.now(),
      name: '',
      totalMarks: '',
      passingMarks: '',
      duration: '',
      type: '',
      status: 'Active',
      content: null
    };
  }
}
