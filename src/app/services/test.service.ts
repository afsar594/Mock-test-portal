// test.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests: any[] = [];

  getTests() {
    return this.tests;
  }

  addTest(test: any) {
    this.tests.push(test);
  }

  deleteTest(index: number) {
    this.tests.splice(index, 1);
  }

  toggleStatus(index: number) {
    this.tests[index].status = this.tests[index].status === 'Active' ? 'Inactive' : 'Active';
  }
}
