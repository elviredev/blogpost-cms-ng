import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user: User = { username: '', password: '' };
 
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
   
  }

  login(){
    console.log('user', this.user);
    this.authService
      .login(this.user)
      .subscribe(data => this.handleSuccess(data), error => this.handleError(error));
  }

  handleSuccess(data) {
    console.log('logged in', data);
    this.router.navigate(['/admin']);
  }

  handleError(error) {
    console.error('NOT logged in !', error);
  }

  register(){
    console.log('user', this.user);
    this.authService
      .register(this.user)
      .subscribe(data => this.handleRegisterSuccess(data), error => this.handleRegisterError(error));
  }
  handleRegisterSuccess(data) {
    console.log('user created', data);
    this.login();
    //this.router.navigate(['/admin']);
  }
  handleRegisterError(error) {
    console.error('user NOT created', error);
  }

}
