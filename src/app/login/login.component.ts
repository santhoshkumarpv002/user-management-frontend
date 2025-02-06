import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../docs/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  invalid: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(){
if(this.auth.isuserLoggedIn()){

  // this.router.navigate(['dashboard',sessionStorage.getItem('AUTHENTICATED_USER')]);
  this.router.navigate(['dashboard',localStorage.getItem('AUTHENTICATED_USER')]);
}



  }

  handleLogin() {
    console.log("insdie login");
    this.auth.login(this.email, this.password).subscribe(
      (data) => {
        // Handle successful authentication
        // this.showMsg(data.message)
        if (data.statusCode === '200') {
          this.router.navigate(['dashboard', this.email]);
          console.log('sinsdie dashb');
        }
      },
      (error) => {
        // Handle authentication error
        console.log('comes under error');
        // this.invalid=true;
        // this.errorMessage=error.error.errorMessage;
        this.showMsg(error.error.errorMessage);
      }
    );
  }

  showMsg(message: string) {
    // Display the error message to the user
    alert(message); // You can replace this with your preferred method of displaying error messages
  }
}
