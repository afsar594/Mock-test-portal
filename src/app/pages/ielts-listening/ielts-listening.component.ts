import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ielts-listening',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ielts-listening.component.html',
  styleUrls: ['./ielts-listening.component.css']
})
export class IeltsListeningComponent implements OnInit {

  audio = new Audio('assets/audio/listening-test.mp3');
  isPlaying = false;

  studentText = '';

  questions = [
    { q: 'What was the main topic of the talk?', answer: '' },
    { q: 'What did the speaker say about online education?', answer: '' }
  ];

  totalSeconds = 30 * 60; // 30 minutes
  timer: any;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.totalSeconds--;
      if (this.totalSeconds <= 0) {
        this.submitTest();
      }
    }, 1000);
  }

  playAudio() {
    this.audio.play();
    this.isPlaying = true;
  }

  pauseAudio() {
    this.audio.pause();
    this.isPlaying = false;
  }

  submitTest() {
    clearInterval(this.timer);
    this.audio.pause();

    alert('Listening test submitted successfully!');
  }

  get minutes() {
    return Math.floor(this.totalSeconds / 60);
  }

  get seconds() {
    return this.totalSeconds % 60;
  }
}
