import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ielts-reading',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ielts-reading.component.html',
  styleUrls: ['./ielts-reading.component.css']
})
export class IeltsReadingComponent {

  answers: any = {
    q1: '',
    q2: '',
    q3: ''
  };

  submitReadingTest() {
    alert(
      'Reading test submitted successfully.\n\n' +
      'Your answers have been saved.'
    );

    // For future: send answers to moderator/ backend
    console.log(this.answers);
  }
}
