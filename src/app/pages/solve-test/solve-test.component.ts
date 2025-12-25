import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-solve-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class SolveTestComponent implements OnInit {

  test: any;
  answers: any = {};
  submitted = false;

  // Global Test Timer
  timeLeft: number = 0;
  timerInterval: any;

  // Listening
  currentAudioIndex: number = -1;
  audioTime: number[] = [];
  audioElements: any[] = [];

  // Speaking
  recording: boolean = false;
  recordingTime: number = 0;
  recordingInterval: any;
  mediaRecorder: any;
  audioChunks: any[] = [];
  recordedAudio: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.test = this.testService.getTestById(id);

    if(!this.test || this.test.status !== 'Active') {
      alert('Test not available');
      this.router.navigate(['/student-dashboard']);
      return;
    }

    this.timeLeft = this.test.duration * 60;
    this.startTimer();

    if(this.test.type === 'LISTENING') {
      this.test.content.recordings.forEach((rec: any, i: number) => {
        this.audioTime[i] = 0;
        const audio = new Audio(rec.audio);
        audio.onended = () => this.onAudioEnded(i);
        audio.ontimeupdate = () => {
          if(this.currentAudioIndex === i) this.audioTime[i] = Math.floor(audio.currentTime);
        };
        this.audioElements[i] = audio;
      });
    }
  }

  /* ===== Global Timer ===== */
  startTimer() {
    if(this.timerInterval) return;
    this.timerInterval = setInterval(() => {
      if(this.timeLeft > 0) this.timeLeft--;
      else this.submitTest();
    }, 1000);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  /* ===== Listening ===== */
  onAudioPlay(index: number) {
    this.audioElements.forEach((a, i) => {
      if(i !== index) { a.pause(); a.currentTime = a.duration; }
    });
    this.currentAudioIndex = index;
    this.audioElements[index].play();
  }

  onAudioEnded(index: number) {
    this.audioTime[index] = Math.floor(this.audioElements[index].duration);
    this.currentAudioIndex = -1;

    // Auto-play next recording
    if(index + 1 < this.audioElements.length) {
      setTimeout(() => this.audioElements[index + 1].play(), 500);
    }
  }

  /* ===== Speaking ===== */
  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];
    this.recording = true;
    this.recordingTime = 0;

    this.recordingInterval = setInterval(() => this.recordingTime++, 1000);

    this.mediaRecorder.ondataavailable = (e: any) => this.audioChunks.push(e.data);

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
      this.recordedAudio = URL.createObjectURL(blob);
      clearInterval(this.recordingInterval);
      this.recordingTime = 0;
    };

    this.mediaRecorder.start();
  }

  stopRecording() {
    if(this.mediaRecorder && this.recording) this.mediaRecorder.stop();
    this.recording = false;
  }

  /* ===== Submit Test ===== */
  submitTest() {
    if(this.submitted) return;
    this.submitted = true;
    clearInterval(this.timerInterval);
    if(this.recording) this.stopRecording();
  }
}
