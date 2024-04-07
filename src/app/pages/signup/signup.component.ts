import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { BASE_URL } from 'src/utils/baseUrl';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const userData = {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
    };
    axios
      .post(`${BASE_URL}/signup`, userData)
      .then((response) => {
        console.log('Signup successful:', response.data);
        if (response.data.success) {
          this.router.navigate(['/login']);
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  }
}
