import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ielts-writing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ielts-writing.component.html',
  styleUrls: ['./ielts-writing.component.css']
})
export class IeltsWritingComponent {

  task1Answer = '';
  task2Answer = '';

  getWordCount(text: string): number {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  }

  submitWritingTest() {
    alert(
      'Your writing test has been submitted successfully.\n\n' +
      'Our examiner will review your answers and notify you via email.'
    );

    // later: email / backend API
  }
}
