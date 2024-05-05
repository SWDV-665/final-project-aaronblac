import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage {

  
  email:any;
  constructor(public authService:AuthenticationService, public router: Router, public tstCntrl: ToastController) { }

  async resetPassword(){
    this.authService.resetPassword(this.email).then(() => {
      console.log('reset link sent')
      this.presentToast();
    }).catch((error)=>{
      console.log(error);
    });
  }
  async presentToast(){
    const toast = await this.tstCntrl.create({
      message: 'Your reset password link has been sent on your email',
      duration: 2000, 
      position: 'bottom' 
    })
    
    toast.present();
    toast.onDidDismiss().then(()=>{
      this.router.navigate(['/login'])
    })
  }
}
