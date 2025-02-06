import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  sessionStored: boolean = false;

  constructor(private router: Router) {}

//   ngOnInit() {
//     console.log('Ts');
//     if (sessionStorage.getItem('TOKEN')) {
//       // console.log(sessionStorage.getItem('TOKEN'));
//       this.sessionStored = true;
//     }
//   }

//   handleLogout() {
//     sessionStorage.removeItem('AUTHENTICATED_USER');
//     sessionStorage.removeItem('TOKEN');
//     this.router.navigate(['login']);
//   }
// }

ngOnInit() {
  console.log('Ts');
  if (localStorage.getItem('TOKEN')) {
    // console.log(sessionStorage.getItem('TOKEN'));
    this.sessionStored = true;
  }
}

handleLogout() {
  localStorage.removeItem('AUTHENTICATED_USER');
  localStorage.removeItem('TOKEN');
  this.router.navigate(['login']);
}
}
