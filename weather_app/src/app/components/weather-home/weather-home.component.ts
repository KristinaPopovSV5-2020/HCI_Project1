import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent {
  elements = Array.from({length: 10}, (_, i) => i + 1);

}
