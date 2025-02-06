
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api/api.service';


export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public gender: string,
    public address: string,
    public phone: string
  ) {}
}

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, HeaderComponent,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent  {
  constructor(private api: ApiService, private routeData:ActivatedRoute) {}
// newUser:User={}
  users:User[]=[];
  email:string='';

  ngOnInit():void{
    console.log("tocheck dashboard");
    this.getAllUsers();
    this.email=this.routeData.snapshot.params['email'];

    for (let i = 0; i < 2; i++) {}
setTimeout(() => {
  this.getAllUsers();
}, 2000);
  }

  getAllUsers() {
    this.api.getallusers().subscribe(
      (users) => {
        this.users = users;
        console.log(users);
      },
      (error) => {
        console.error('Error occurred:', error);
        // Handle error by calling the alternative API
        this.api.getData(this.email).subscribe(
          (users) => {
            this.users = users;
            console.log(users);
          },
          (error) => {
            console.error('Error occurred in fallback API:', error);
          }
        );
      }
    );
  }
  





showEditWindow=false;
  dataForUpdate:User={
  id:'',
  name: ' ',
    email: ' ',
    password: '',
    role: '',
    gender: '',
    address: '',
    phone: ''}


  editUser(email:string){
    
    this.showEditWindow=true;
    const index=this.users.findIndex((user)=>user.email===email);
    if(index !=-1){
      this.dataForUpdate=this.users[index];}
}



updateUser(dataForUpdate:User){
  console.log("inside");

if(Object.values(dataForUpdate).every(val => val !== null && val !== '')){
  
}else{
  alert('Please fill all the fields');
  return;
}



 this.showEditWindow=false;
  const index=this.users.findIndex((user)=>user.email===dataForUpdate.email);
  console.log(this.users[index] +' before ') ;
  // if(index!=-1){
    this.users[index]=dataForUpdate;
    this.api.update(dataForUpdate,this.email).subscribe(
      (data)=>{
        console.log(data);
        this.users[index]=data;
      } 
     
    )
  // }

}
  deleteUser(email: string) {


   const index= this.users.findIndex((user) => user.email === email);
   if(index !=-1){
    this.users.splice(index,1);
    console.log(this.users);
   }
    this.api.deleteUser(email).subscribe(
      (data) => {
        console.log('User deleted:', email);
      },
      (error) => {
        console.log('Error:', error.error.errorMessage);
      }
    );
    // this.getAllUsers();
  }

  // updateUser(fd:string){}


















































































































//   users: User[] = [];
//   private intervalId: any;
//   email: any = '';
//   subscription: any;

//   constructor(
//     private route: ActivatedRoute,
//     private apiService: ApiService,
//     private cdr: ChangeDetectorRef,
//     private ngZone: NgZone
//   ) {}

//   ngOnInit() {
    
//     this.email = this.route.snapshot.paramMap.get('email'); // 'id' is the name of the path variable
//     console.log(this.email + ' got from param');

//     this.loadUsers(); // Initial load
//   }
 
  

//   loadUsers() {
//     this.apiService.getData(this.email).subscribe((data) => {
//       console.log(data + ' for single User');
//       this.users = data;
//       this.ngZone.run(() => this.cdr.detectChanges()); // Update view
//     });
//     this.apiService.getallusers().subscribe((data) => {
//       console.log(data);
//       this.users = data;
//       this.ngZone.run(() => this.cdr.detectChanges()); // Update view
//     });
//   }

//   // deleteUser(email: string) {
//   //   this.apiService.deleteUser(email).subscribe(
//   //     (data) => {
//   //       console.log('called top');
//   //       this.loadUsers(); // Call loadUsers as a method
//   //       this.ngZone.run(() => this.cdr.detectChanges()); // Update view
//   //       return data;
//   //     },
//   //     (error) => {
//   //       console.log('Error:' + error.error.errorMessage);
//   //     }
//   //   );
//   //   this.loadUsers();
//   //   console.log('called bottom');
//   // }
//   deleteUser(email: string) {
//     this.apiService.deleteUser(email).subscribe(
//       (data: string) => {
//         console.log('Response from server:', data);
//         // Remove the deleted user from the users array
//         this.users = this.users.filter(user => user.email !== email);
//         this.loadUsers();
//         this.ngZone.run(() => this.cdr.detectChanges()); // Update view
//       },
//       (error) => {
//         console.log('Error:', error.error.errorMessage);
//       }
//     );
//   }
  
  
  



//   // deleteUser(email: string) {
//   //   this.apiService.deleteUser(email).subscribe(
//   //     (data) => {
//   //       console.log('called top');
//   //       this.loadUsers(); // reload data after deletion
//   //       this.ngZone.run(() => this.cdr.detectChanges()); // update view
//   //       return data;
//   //     },
//   //     (error) => {
//   //       console.log('Error:' + error.error.errorMessage);
//   //     }
//   //   );
//   // }
// //   updateUser(id: string, name: string, email: string, role: string, gender: string, address: string, phone: string) {
// //     // Your logic here
// // }
// currentUserAdmin:boolean=false;
// showUpdatForm:boolean=false;
// dataForUpdate:User=new User("1",'1','1','1','1','1','','1');
// updateUser(data: User) {
//   console.log("wordl");
//   this.showUpdatForm=true;
//   this.dataForUpdate.id = data.id;
//   this.dataForUpdate.name = data.name;
//   this.dataForUpdate.email = data.email;
//   this.dataForUpdate.role = data.role;
//   this.dataForUpdate.gender = data.gender;
//   this.dataForUpdate.address = data.address;
//   this.dataForUpdate.phone = data.phone;
//  if(this.dataForUpdate.role.toLowerCase()==='admin'){
//   this.currentUserAdmin=true;
//  }
//   console.log(data.gender);

// }


// subitforUpdate(){
  
//   this.apiService.update(this.dataForUpdate).subscribe(
//     (datas):any => {
//       // Handle successful authentication
//       // this.showMsg(data.message)
//       if (datas.statusCode === '200') {
//         console.log('sinsdie dashb');
//       }
//     },
//     (error) => {
//       // Handle authentication error
//       console.log(error.error.errorMessage);
//       // this.invalid=true;
//       // this.errorMessage=error.error.errorMessage;
//       // this.showMsg(error.error.errorMessage);
//     }
//   );
//   this.loadUsers();
// }
//   // deleteUser(email: string) {
//   //   this.apiService.deleteUser(email).subscribe(
//   //     (data) => {
//   //       console.log('User deleted:', data);
//   //     },
//   //     (error) => {
//   //       console.log('Error:', error.error.errorMessage);
//   //     }
//   //   );
//   //   this.loadUsers();
//   // }




}
