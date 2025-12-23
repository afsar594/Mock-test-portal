import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private tests: any[] = [];

  private testsSubject = new BehaviorSubject<any[]>([]);
  tests$ = this.testsSubject.asObservable();

  /* ================= GET ALL TESTS ================= */
  getTests() {
    return [...this.tests]; // safe copy
  }

  /* ================= SAVE / UPDATE TEST ================= */
  saveTest(test: any) {
    const index = this.tests.findIndex(t => t.id === test.id);

    if (index > -1) {
      this.tests[index] = test; // edit existing
    } else {
      this.tests.push(test); // new test
    }

    this.testsSubject.next([...this.tests]); // emit update
  }

  /* ================= GET TEST BY ID ================= */
  getTestById(id: number) {
    return this.tests.find(t => t.id === id);
  }

  /* ================= DELETE TEST ================= */
  deleteTest(id: number) {
    this.tests = this.tests.filter(t => t.id !== id);
    this.testsSubject.next([...this.tests]);
  }

  /* ================= TOGGLE ACTIVE / INACTIVE ================= */
  toggleStatusById(id: number) {
    const test = this.tests.find(t => t.id === id);
    if (!test) return;

    test.status = test.status === 'Active' ? 'Inactive' : 'Active';
    this.testsSubject.next([...this.tests]);
  }
}
