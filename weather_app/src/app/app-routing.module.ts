import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherHomeComponent } from './components/weather-home/weather-home.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {path: 'home', component: WeatherHomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'weather-details/:date', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
