import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { BASE_URL } from 'src/utils/baseUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  formData: any = {};
  token: string | null = localStorage.getItem('token');
  loggedInUser: any = JSON.parse(localStorage.getItem('user') || '{}');
  editMode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  toggleEditMode() {
    this.editMode = !this.editMode; 
  }

  deleteUser(id:any):void {
    axios
     .delete(`${BASE_URL}/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
     .then((res) => {
        this.getAllUsers();
      })
     .catch((err) => {
        console.log(err);
      });
  }


  logout() {
    axios
      .post(`${BASE_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('User logged out');
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }
  submitForm() {
    axios
      .put(`${BASE_URL}/updateuser`, this.formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          alert('User information updated successfully');
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.getAllUsers();
          this.editMode = false; 
        }
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }

  getAllUsers() {
    if (this.token) {
      axios
        .get(`${BASE_URL}/allusers`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.users = response.data.allUsers;
          console.log(this.users);
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
    } else {
      console.error('Token not found.');
    }
  }
}
