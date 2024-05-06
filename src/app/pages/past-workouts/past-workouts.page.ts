import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { FirebaseDatabaseService } from 'src/app/firebase-database.service';
import { WorkoutData } from '../../firebase-database.service'
import { ActivatedRoute, Route, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-past-workouts',
  templateUrl: './past-workouts.page.html',
  styleUrls: ['./past-workouts.page.scss'],
})
export class PastWorkoutsPage implements OnInit {

  pastWorkouts: WorkoutData[] = [];
  isLoading: boolean = false; 
  userID: string = '';
  error: string | null = null;

  currentUser$ = this.authService.currentUser$;

  constructor(private db: FirebaseDatabaseService, private authService: AuthenticationService, public tstCtrl: ToastController, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
   
      const routeParams = await this.route.paramMap.subscribe(async params =>{
        this.userID = params.get('userID')
          if (this.userID) { // check if userID has a value
            await this.getPastWorkouts();
            console.log("pastWorkouts triggered")
          }else {
              console.error("No user found as currentUser$")
            }  
      })
      console.log("routeParams: ",routeParams)
  }

  async getPastWorkouts(){
    this.isLoading = true;
    this.error = null;
    try{
      this.pastWorkouts = await this.db.getPastWorkouts(this.userID);
      console.log("past workouts: ",this.pastWorkouts)
    } catch (error){
      console.error("Error getting past workouts: ", error);
      this.error = "Failed to retrieve past workouts";
    } finally {
      this.isLoading = false;
    }
  }

  async backToWorkout(){
      this.router.navigate(['/start-workout']);
  };
  
}
