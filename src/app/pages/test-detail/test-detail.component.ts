import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailsComponent implements OnInit {

  test: any;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.test = this.testService.getTestById(id);
  }

  /* ================= LISTENING ================= */
  addListeningQuestion(sectionIndex: number) {
    this.test.content.recordings[sectionIndex].questions.push({ q: '' });
    this.save();
  }

  /* ================= READING ================= */
  addReadingQuestion(passageIndex: number) {
    this.test.content[passageIndex].questions.push({
      q: '',
      answer: ''
    });
    this.save();
  }

  /* ================= SPEAKING ================= */
  addSpeakingQuestion(part: 'part1' | 'part3') {
    this.test.content[part].push({ q: '' });
    this.save();
  }

  /* ================= SAVE ================= */
  save() {
    this.testService.saveTest(this.test);
  }
}
