import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastWorkoutsPageRoutingModule } from './past-workouts-routing.module';

import { PastWorkoutsPage } from './past-workouts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastWorkoutsPageRoutingModule
  ],
  declarations: [PastWorkoutsPage]
})
export class PastWorkoutsPageModule {}
