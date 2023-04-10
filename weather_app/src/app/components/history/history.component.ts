import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherService } from '../weather.service';
import { HistoryDetails, Weather } from '../weather-home/weather-home.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{


  public weather: HistoryDetails = {
    city: "",
    date: "",
    maxtemp_c: 0,
    mintemp_c: 0,
    avgtemp_c: 0,
    maxwind_kph: 0,
    totalprecip_mm: 0,
    avgvis_km: 0,
    avghumidity: 0,
    uv: 0,
    icon: "",
    text: "",
    sunrise: "",
    sunset: "",
    moonrise: "",
    moonset: ""
  }

  constructor(private weatherService:WeatherService,public dialogRef: MatDialogRef<HistoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: HistoryDetails) {
    this.weather= data;
  }
  
  ngOnInit(): void {
    
  }

  

}
