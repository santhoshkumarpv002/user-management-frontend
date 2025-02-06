import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api/api.service';


@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  gender: string = '';
  address: string = '';
  phone: string = '';

  msg:string='';
  msgShow: boolean = false;

  successShow: boolean = false;
  successmsg:string='';

  waitmsg:string='we are creating Id for you, page will redirect';
  waitmsgshow=false;

  constructor(private apiService: ApiService,private router: Router) {}

  handleRegister() {
    this.waitmsgshow=true;
    console.log(this.name);
    console.log(this.gender);

    let user = new User(
      '',
      this.name,
      this.email,
      this.password,
      this.role,
      this.gender,
      this.address,
      this.phone
    );
    this.apiService.newUser(user).subscribe((data:any) => {
      console.log(data);
    this.successShow = true;
    this.successmsg = 'Your account was successfully created. Your ID has been sent to your email. page will Redirection';
    if(data.statusCode==='201'){
      console.log("insdie regils regid");
      this.router.navigate(['login']);
    }
    
    
    

    },
  error => {
    this.msgShow = true;
    const errorObj = error.error;
    if (errorObj && typeof errorObj === 'object') {
      const errorKeys = Object.keys(errorObj);
      this.msg = errorKeys.map(key => errorObj[key]).join(', ');
    } else {
      this.msg = error.error.errorMessage;
    }
    // console.log(error.error.errorMessage);
  });
  }
}