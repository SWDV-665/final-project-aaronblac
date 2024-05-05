import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/compat/firestore';
import { getDocs } from 'firebase/firestore';
import { firstValueFrom } from 'rxjs';

export interface WorkoutData{
  date: string;
  distance: number;
  type: string;
  userID: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  constructor(private db: AngularFirestore) { }

  async getTotalDistance(): Promise<number | null>{
    const distanceDoc = await firstValueFrom(this.db.collection('workouts').doc('distance').get());
    return distanceDoc.exists ? (distanceDoc.data() as any).distance : null;
  }
  async setTotalDistance(distance: number): Promise<void>{
    await this.db.collection('workouts').doc('distance').set({ distance });
  }

  async saveWorkout(workoutData: any): Promise<void> {
    await this.db.collection('workouts').add(workoutData);
  }

  async getPastWorkouts(userID: string): Promise<WorkoutData[]>{
    try{
      const workoutRef = this.db.collection<WorkoutData>('workouts');
      const query = workoutRef.ref.where('userID', '==', userID);
      const querySnapshot = await getDocs(query);
      const workouts: WorkoutData[] = [];
      querySnapshot.forEach((doc) => {
        const workoutData = doc.data() as WorkoutData;
        if(workoutData.userID === userID){
          workouts.push(workoutData)
        }
      });
      return workouts;
    }catch(error){
      console.error("Error getting documents", error);
      return [];
    }
  

  }

}
