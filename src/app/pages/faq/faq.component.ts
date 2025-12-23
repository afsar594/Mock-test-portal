import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    {
      question: 'What are the two types of IELTS test?',
      answer: `There are two types of the IELTS test: IELTS Academic and IELTS General Training.
The Academic test is for higher education or professional registration, while the General Training test is for work, migration, or secondary education in English-speaking countries.`,
      open: false
    },
    {
      question: 'Which IELTS test should I take?',
      answer: `You should check the requirements of the institution or organization you are applying to and select either Academic or General Training accordingly.`,
      open: false
    },
    {
      question: 'What is the IELTS test format and duration?',
      answer: `The IELTS test has four sections: Listening (30 min), Reading (60 min), Writing (60 min), and Speaking (11-14 min). Total test time is 2 hours 45 minutes.`,
      open: false
    },
    {
      question: 'Can I make notes on the IELTS Listening and Reading question papers?',
      answer: `Yes, you can make notes. However, the IELTS Examiner will not see your notes.`,
      open: false
    },
    {
      question: 'What do I need for the IELTS Speaking test?',
      answer: `Bring the same identification documents you used for registration. Personal items, electronic devices, and watches are not allowed in the Speaking test room.`,
      open: false
    },
    {
      question: 'Where can I find IELTS practice tests?',
      answer: `Free practice tests and preparation material are available on our website.`,
      open: false
    },
    // ✅ Additional FAQs
    {
      question: 'How is the IELTS scored?',
      answer: `Each section (Listening, Reading, Writing, Speaking) is scored from 0 to 9. The overall band score is the average of the four sections.`,
      open: false
    },
    {
      question: 'Can I retake the IELTS test if I am not satisfied with my score?',
      answer: `Yes, you can retake the IELTS test as many times as you like. You just need to register and pay the test fee again.`,
      open: false
    },
    {
      question: 'Is there any age limit for taking the IELTS test?',
      answer: `There is no age limit. Candidates of all ages can take the IELTS test.`,
      open: false
    },
    {
      question: 'How do I register for the IELTS test?',
      answer: `You can register online through the official IELTS website or at authorized test centers.`,
      open: false
    }
  ];

  toggleAnswer(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
