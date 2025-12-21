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

  // LISTENING (4 sections)
  listening = {
    recordings: [
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] },
      { audio: '', questions: [{ q: '' }] }
    ]
  };

  // READING (3 passages)
  reading = [
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] },
    { passage: '', questions: [{ q: '', answer: '' }] }
  ];

  // WRITING
  writing = {
    task1: '',
    task2: ''
  };

  // SPEAKING
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

  saveTest() {
    if (!this.test.name || !this.test.type) {
      alert('Please fill test name and type');
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
