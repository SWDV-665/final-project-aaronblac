import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { FirebaseDatabaseService } from 'src/app/firebase-database.service';
import { GeolocationService } from 'src/app/geolocation.service';


@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.page.html',
  styleUrls: ['./start-workout.page.scss'],
})
export class StartWorkoutPage implements OnInit, OnDestroy {

  isTracking = false;
  totalDistance = 0;
  pauseStartTime: number | null = null;
  previousPosition: GeolocationPosition | null = null;
  positionSubscription: Subscription | null = null;
  selectedWorkoutType: string = "";
  paused = false;

  constructor(public authService: AuthenticationService, 
    public router: Router, 
    public tstCtrl: ToastController, 
    private geolocationService: GeolocationService,
    private firebaseDatabaseService: FirebaseDatabaseService
   ) { }

   currentUser$ = this.authService.currentUser$;
   userID: string | null = null;
  
  async ngOnInit() {
    this.currentUser$.subscribe(user => {
      if (user){
        this.userID = user.uid;
        console.log("userID: ", this.userID)
      }
    })
    
  }
  
  async toggleTracking(){
   if(this.isTracking){
      await this.pauseTracking();
    }else if(this.pauseStartTime){
      await this.resumeTracking();
    }else{
      await this.startTracking();
    }
  }

  async startTracking(){
    if(this.selectedWorkoutType == ""){
      const toast = await this.tstCtrl.create({
        message: "Choose Workout Type To Continue!",
        duration: 2000,
        position: 'bottom'
      });
      toast.present(); 
      return;
    }
    this.isTracking = true;
    await this.geolocationService.watchPosition();//Initiate watch

    //Subscribe to position updates 
    this.positionSubscription = this.geolocationService.getPositonUpdates()
      .subscribe(position => {
        if(this.previousPosition && !this.pauseStartTime){
          const distanceInMeters = this.geolocationService.calculateDistance(
            this.previousPosition.coords.latitude,
            this.previousPosition.coords.longitude,
            position.coords.latitude,
            position.coords.longitude
          );
          this.totalDistance += distanceInMeters * 0.000621371;//convert to miles
          this.previousPosition = position;
        }
      });
  }
  
  async pauseTracking(){
    this.isTracking = false;
    this.pauseStartTime = Date.now();
    console.log('Pause Time:', this.pauseStartTime);
    this.paused = true;
  }

  async resumeTracking(){
    if(!this.pauseStartTime){
      return;//already tracking or not paused
    }
    this.pauseStartTime = null;//clear pauseStartTime

    this.paused = false;
    this.isTracking = true;
  }

  async stopTracking(){
    this.isTracking = false;
    this.pauseStartTime = null;
    console.log("Position Subscription", this.positionSubscription)
    //unsubscribe
    if(this.positionSubscription){
      this.positionSubscription.unsubscribe();
      this.positionSubscription = null;
    }

    if(this.totalDistance >= 0 ){
      const locale = 'en-US';
      const formattedDate = formatDate(new Date(), 'yyyy-MM-dd HH:mm', locale)
      const workoutData = {
        dateTime: formattedDate,
        distance: this.totalDistance,
        userID: this.userID,
        workoutType: this.selectedWorkoutType
      };
      await this.firebaseDatabaseService.saveWorkout(workoutData);
      const toast = await this.tstCtrl.create({
        message: "Workout Saved!",
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  async logout(){
    this.authService.signOut().then(()=>{
      this.stopTracking();
      this.router.navigate(['/landing']);
    }).catch((error)=>{
      console.log(error);
    });
  };

  async viewWorkouts(){
      this.router.navigate(['/past-workouts',this.userID]);
  };

  ngOnDestroy(){
    if (this.positionSubscription){
      this.positionSubscription.unsubscribe();
    };
  }

}
