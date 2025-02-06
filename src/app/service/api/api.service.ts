import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../dashboard/user.model';
// import { User } from '../../user/user.model';



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL: string = 'http://ec2-44-203-232-64.compute-1.amazonaws.com:8080/';

  private headers = new HttpHeaders({
    // Authorization: `Bearer ${sessionStorage.getItem('TOKEN')}`,
    Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
  });
  // dataUpdated$: any;

  constructor(private http: HttpClient) {}

  getallusers():Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/api/users/all`, {
      headers: this.headers,
    });
  }







  deleteUser(id: string): Observable<string> {
    return this.http.delete<string>(`${this.BASE_URL}/api/users/delete/${id}`, {
      headers: this.headers,
    });
  }
  





   newUser(user: User) {
    return this.http.post<User>(`${this.BASE_URL}/api/jwt/register`, user);
  }


  getData(email:String){
    return this.http.get<any>(`${this.BASE_URL}/api/users/${email}`, {
      headers: this.headers,
    });
  }
  update(data: User,email:string) {
    return this.http.put<any>(`${this.BASE_URL}/api/users/update/${email}`, data,
    {
      headers:this.headers
    }
    );
}

}
