import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {

    // MODERATOR LOGIN
    if (this.username === 'moderator' && this.password === '123') {

      localStorage.setItem(
        'user',
        JSON.stringify({
          role: 'moderator',
          name: 'Moderator'
        })
      );

      this.router.navigate(['/moderator-dashboard']);
      return;
    }

    // STUDENT LOGIN (any name or ID allowed)
    if (this.username.trim() !== '' && this.password === '123') {

      localStorage.setItem(
        'user',
        JSON.stringify({
          role: 'student',
          name: this.username
        })
      );

      this.router.navigate(['/student-dashboard']);
      return;
    }

    alert('Invalid username or password');
  }
}
