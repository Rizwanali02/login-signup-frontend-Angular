import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { BASE_URL } from 'src/utils/baseUrl';

export interface Login {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    const userData: Login = {
      email: this.email,
      password: this.password,
    };
    axios
      .post(`${BASE_URL}/login`, userData)
      .then((response: any) => {
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/home']);
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  }
}
