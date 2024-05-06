import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup
  showPassword = false;
  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AuthenticationService, public router:Router, public toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email : ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['',[
        Validators.required,
        Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ]]
    })
  }

  get errorControl(){
    return this.loginForm.controls;
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.loginForm.valid){
      try{

        await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password)
        loading.dismiss();
        this.router.navigate(['/home'])
      }catch(error) {
        console.log(error);
        loading.dismiss();
      };
     
    } else if(!this.loginForm.valid) {
      console.log('loginForm not valid') 
      const toast = await this.toastController.create({
        message: 'Invalid Login Credentials!',
        duration: 2000
      });
      toast.present();
      // Reload the page after toast duration
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
    }
  }


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
