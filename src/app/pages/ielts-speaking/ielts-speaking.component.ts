import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ielts-speaking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ielts-speaking.component.html',
  styleUrls: ['./ielts-speaking.component.css']
})
export class IeltsSpeakingComponent {

  // Current option: 'text' or 'audio'
  option: 'text' | 'audio' = 'text';

  // Text answers
  answers: any = {
    part1: '',
    part2: '',
    part3: ''
  };

  // Audio recording
  audioData: any = null;
  mediaRecorder: any;
  audioChunks: any[] = [];
  isRecording = false;

  // Submit text answers
  submitTextTest() {
    alert('Speaking test submitted successfully (Text answers).');
    console.log(this.answers);
    // Future: send to backend or moderator
  }

  // Start recording audio
  async startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Audio recording is not supported in this browser.');
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = (event: any) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.onstop = () => {
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
      this.audioData = URL.createObjectURL(audioBlob);
    };

    this.mediaRecorder.start();
    this.isRecording = true;
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  submitAudioTest() {
    if (!this.audioData) {
      alert('Please record your audio first.');
      return;
    }

    alert('Speaking test submitted successfully (Audio).');
    console.log('Audio URL:', this.audioData);
    // Future: send audio to backend or moderator
  }

}
