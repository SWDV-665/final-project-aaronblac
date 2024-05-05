import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  user:any;
  constructor(public authService: AuthenticationService, public router: Router) { 
  }
  
  ngOnInit() {
    this.authService.getProfile().then(user => {
      console.log("user: ",user)
      this.user = user;

    }).catch(error => {
      console.error('Error fetching user profile: ', error)
    });
      
  }

  async logout(){
    this.authService.signOut().then(()=>{
      this.router.navigate(['/landing']);
    }).catch((error)=>{
      console.log(error);
    });
  };

}
