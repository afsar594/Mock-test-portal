import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  rememberMe = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const savedUser = localStorage.getItem('rememberedUser');
    if (savedUser) {
      this.username = savedUser;
      this.rememberMe = true;
    }
  }

  login() {

    if (this.rememberMe) {
      localStorage.setItem('rememberedUser', this.username);
    } else {
      localStorage.removeItem('rememberedUser');
    }

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

    // STUDENT LOGIN
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

  forgotPassword() {
    alert('Please contact admin to reset your password.');
  }
}
