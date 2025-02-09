import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  BASE_URL: string = 'https://user-management-367525621532.us-central1.run.app';


  
    private headers = new HttpHeaders({
      // Authorization: `Bearer ${sessionStorage.getItem('TOKEN')}`,
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
      // Origin: 'https://santhoshkumarpv002.github.io/',
    });

    login(email: string, password: string) {
      return this.http.post<any>(`${this.BASE_URL}/api/jwt/login`, {
        email: email,
        password: password,
      }, {
        headers: this.headers,
        observe: 'response' // Observe the full response
      }).pipe(
        map((response: HttpResponse<any>) => {
          const token = response.headers.get('authorization')?.replace('Bearer ', '');
          if (token) {
            localStorage.setItem('AUTHENTICATED_USER', email);
            localStorage.setItem('TOKEN', token);
            console.log('Token stored in session storage.');
          } else {
            console.error('Token is null or undefined.');
          }
          return response.body; // Return the actual response body
        })
      );
    }


  
  // login(email: string, password: string) {
  //   return this.http.post<any>(`${this.BASE_URL}/api/jwt/login`, {
  //       email: email,
  //       password: password,
  //     }, { observe: 'response' },) // Observe the full response
  //     .pipe(
  //       map((response: HttpResponse<any>) => {
  //         const token = response.headers.get('authorization')?.replace('Bearer ', '');
  //         if (token) {
  //           // sessionStorage.setItem('AUTHENTICATED_USER', email);
  //           // sessionStorage.setItem('TOKEN', token);
            
  //           localStorage.setItem('AUTHENTICATED_USER', email);
  //           localStorage.setItem('TOKEN', token);
  //           console.log('Token stored in session storage.');
  //         } else {
  //           console.error('Token is null or undefined.');
  //         }
  //         return response.body; // Return the actual response body
  //       })
  //     );
  // }
  
  


  forgotPassword(email: string) {
    return this.http.get<string>(
      `${this.BASE_URL}/api/jwt/forgot/${email}`, {
        headers: this.headers,
      }
    );
  }

  verifyOTP(data: any) {
    return this.http.post<any>(
      `${this.BASE_URL}/api/jwt/verifyOTP`,
      data, {
        headers: this.headers,
      }
    );
  }

  updatepassword(data: any) {
    return this.http.post<any>(
      `${this.BASE_URL}/api/jwt/updatePassword`,
      data, {
        headers: this.headers,
      }
    );
  }

  
    getToken(): string {
      // return sessionStorage.getItem('TOKEN') || '';
      return localStorage.getItem('TOKEN') || '';
    }

    isuserLoggedIn(){
      // let user=sessionStorage.getItem("AUTHENTICATED_USER");
      let user=localStorage.getItem("AUTHENTICATED_USER");
      // console.log("invokedd");
      return !(user===null);
      
        }

}
