import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather-home/weather-home.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{


  date: History;

  constructor(private weatherService:WeatherService,public dialogRef: MatDialogRef<HistoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: History) {
    this.date = data;
  }
  
  ngOnInit(): void {
    console.log(this.date);
    
  }

}
