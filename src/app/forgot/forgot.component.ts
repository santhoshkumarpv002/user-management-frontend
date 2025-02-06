import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../docs/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
  imports: [NgFor, NgIf, CommonModule, FormsModule, RouterLink],
})
export class ForgotComponent {
  msg: string = '';
  msgShow: boolean = false;
  email: string = '';
  isMail: boolean = true;
  isOtp: boolean = false;
  OTP: string = '';
  showPassword: boolean = false;
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleResetPassword() {
    console.log('workd');
    this.authService.forgotPassword(this.email).subscribe(
      (data: any) => {
        console.log('Response Data:', data);
        this.msg = data.message;
        this.msgShow = true;
        this.isMail = false;
        this.isOtp = true;
      },
      (error) => {
        console.error('Error:', error);
        this.msg = error.error?.errorMessage || 'An error occurred,Try again!';
        this.msgShow = true;
      }
    );
  }

  handleOTP() {
    console.log('otophandle called!');
    let data = {
      email: this.email,
      otp: this.OTP,
    };
    this.authService.verifyOTP(data).subscribe((data: any) => {
      console.log(data.message + 'from before condition');
      console.log(typeof data.message);

      if (data.message === true) {
        this.isOtp = false;
        this.msgShow = false;
        this.showPassword = true;
        console.log('inside condiatin');
      } else {
        this.msg = 'OTP is not valid';
        this.msgShow = true;
      }
    });
  }

  handleUpdatePassword() {
    console.log('world update passworld');
    console.log(this.password);
    let data = {
      email: this.email,
      password: this.password,
      otp: this.OTP,
    };
    this.authService.updatepassword(data).subscribe((data: any) => {
      console.log(typeof data.message);

      if (data.message === true) {
        console.log('redirect to login page---------');
        this.router.navigate(['login']);
      } else {
        this.msg = 'some issue with update password -contact our team';
        this.msgShow = true;
      }
    });
  }
}
