import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastWorkoutsPage } from './past-workouts.page';

const routes: Routes = [
  {
    path: ':userID',
    component: PastWorkoutsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastWorkoutsPageRoutingModule {}
