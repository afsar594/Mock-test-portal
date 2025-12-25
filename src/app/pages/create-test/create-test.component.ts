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

  listening: any = {
    recordings: [
      { audioFile: null, audioUrl: '', audioName: '', questions: [{ q: '' }] },
      { audioFile: null, audioUrl: '', audioName: '', questions: [{ q: '' }] },
      { audioFile: null, audioUrl: '', audioName: '', questions: [{ q: '' }] },
      { audioFile: null, audioUrl: '', audioName: '', questions: [{ q: '' }] }
    ]
  };

  reading: any[] = [
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] }
  ];

  writing: any = { task1: '', task2: '' };

  speaking: any = {
    part1: [{ q: '' }],
    part2: '',
    part3: [{ q: '' }]
  };

  constructor(private testService: TestService) {
    this.testService.tests$.subscribe(t => this.allTests = t);
  }

  onAudioSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    const rec = this.listening.recordings[index];
    rec.audioFile = file;
    rec.audioName = file.name;

    const reader = new FileReader();
    reader.onload = () => rec.audioUrl = reader.result;
    reader.readAsDataURL(file);
  }

  addQuestion(list: any[]) {
    list.push({ q: '' });
  }

  removeQuestion(list: any[], index: number) {
    list.splice(index, 1);
  }

  isFormComplete(): boolean {
    if (!this.test.name || !this.test.type) return false;

    if (this.test.type === 'LISTENING') {
      return this.listening.recordings.every((r: any) =>
        r.audioFile && r.questions.every((q: any) => q.q.trim())
      );
    }

    if (this.test.type === 'READING') {
      return this.reading.every((p: any) =>
        p.passage.trim() &&
        p.questions.every((q: any) => q.q.trim() && q.answer.trim())
      );
    }

    if (this.test.type === 'WRITING') {
      return this.writing.task1.trim() && this.writing.task2.trim();
    }

    if (this.test.type === 'SPEAKING') {
      return (
        this.speaking.part1.every((q: any) => q.q.trim()) &&
        this.speaking.part2.trim() &&
        this.speaking.part3.every((q: any) => q.q.trim())
      );
    }

    return false;
  }

  saveTest() {
    this.test.content =
      this.test.type === 'LISTENING' ? this.listening :
      this.test.type === 'READING' ? this.reading :
      this.test.type === 'WRITING' ? this.writing :
      this.speaking;

    this.testService.saveTest(this.test);
    alert(this.isEditMode ? 'Test updated' : 'Test saved');
    this.resetForm();
  }

  editTest(id: number) {
    const found = this.testService.getTestById(id);
    if (!found) return;

    this.isEditMode = true;
    this.test = JSON.parse(JSON.stringify(found));

    if (found.type === 'LISTENING') this.listening = JSON.parse(JSON.stringify(found.content));
    if (found.type === 'READING') this.reading = JSON.parse(JSON.stringify(found.content));
    if (found.type === 'WRITING') this.writing = JSON.parse(JSON.stringify(found.content));
    if (found.type === 'SPEAKING') this.speaking = JSON.parse(JSON.stringify(found.content));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteTest(id: number) {
    if (!confirm('Delete this test?')) return;
    this.testService.deleteTest(id);
  }

  resetForm() {
    this.isEditMode = false;
    this.test = this.emptyTest();
  }

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
