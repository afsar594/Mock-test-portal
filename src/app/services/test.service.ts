import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  tests: any[] = [];

  // Get all tests
  getTests() {
    return this.tests;
  }

  // Save a test (new or edit)
  saveTest(test: any) {
    const index = this.tests.findIndex(t => t.id === test.id);

    if (index > -1) {
      this.tests[index] = test; // edit
    } else {
      this.tests.push(test); // new
    }
  }

  // Delete a test by ID
  deleteTest(id: number) {
    this.tests = this.tests.filter(t => t.id !== id);
  }

  // Get a test by ID
  getTestById(id: number) {
    return this.tests.find(t => t.id === id);
  }

  // Get only active tests
  getActiveTests() {
    return this.tests.filter(t => t.status === 'Active');
  }

  // Toggle test status by index
  toggleStatus(index: number) {
    if (!this.tests[index]) return;

    this.tests[index].status =
      this.tests[index].status === 'Active' ? 'Inactive' : 'Active';
  }
}
