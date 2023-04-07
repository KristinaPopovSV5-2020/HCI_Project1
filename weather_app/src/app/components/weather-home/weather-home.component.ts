import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';

declare var google: any;

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnInit{
  autocompleteService = new google.maps.places.AutocompleteService();
  searchInput: string = '';
  predictions: { description: string, place_id: string }[] = [];
  elements = Array.from({ length: 10 }, (_, index) => index + 1);

  @ViewChild('myDropdownMenu', { static: false })
  dropdownMenuRef!: ElementRef;
  @ViewChild('myInput', { static: false })
  inputRef!: ElementRef;

  city!: string;

  result:any;

  weatherService:WeatherService;
  currentWeather: Weather={
    city: '',
    image: '',
    sky: '',
    max_temp: 0,
    min_temp: 0,
    feels: 0,
    humidity: 0,
    pressure: 0,
    moon: '', current_temp:0
  }

  constructor(weatherService:WeatherService){this.weatherService=weatherService}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBYIxH4GweMZM_xgfqeRkrpO_gjJg7IUNA`;
       
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            const cityResult = data.results.find((result: { types: string | string[]; }) => result.types.includes('locality'));
            this.city = cityResult.address_components[0].long_name;
            this.weatherService.getWeatherCurrentData(this.city).subscribe((res) =>{
              console.log(res)
              this.currentWeather = {
                city: this.city,
                image: res.forecast.forecastday[0].day.condition.icon,
                sky: res.forecast.forecastday[0].day.condition.text,
                max_temp: res.forecast.forecastday[0].day.maxtemp_c,
                min_temp: res.forecast.forecastday[0].day.mintemp_c,
                feels: res.current.feelslike_c,
                humidity: res.current.humidity,
                pressure: res.current.pressure_mb,
                moon: res.forecast.forecastday[0].astro.moon_phase,
                current_temp:res.current.temp_c
              }
        
             })
          })
          .catch(error => console.error(error));
      });
    }
    
  }

  load_current(){
    this.weatherService.getWeatherCurrentData(this.city).subscribe((res) =>{
      //console.log(res)
      this.currentWeather = {
        city: this.city,
        image: res.forecast.forecastday[0].day.condition.icon,
        sky: res.forecast.forecastday[0].day.condition.text,
        max_temp: res.forecast.forecastday[0].day.maxtemp_c,
        min_temp: res.forecast.forecastday[0].day.mintemp_c,
        feels: res.current.feelslike_c,
        humidity: res.current.humidity,
        pressure: res.current.pressure_mb,
        moon: res.forecast.forecastday[0].astro.moon_phase,
        current_temp:res.current.temp_c
      }

     })

  }

  autocomplete() {
    if (this.searchInput.length > 0) {
      this.dropdownMenuRef.nativeElement.classList.add('show');
      this.autocompleteService.getPlacePredictions({ input: this.searchInput },
        (predictions: any[], status: string) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.predictions = predictions.map(prediction => {
              return { description: prediction.description, place_id: prediction.place_id };
            });
          } else {
            this.predictions = [];
          }
        });
    } else {
      this.predictions = [];
    }
    
  }

  selectCity(prediction: { description: string, place_id: string }) {
    this.searchInput = prediction.description;
    this.predictions = [];
    this.city=this.searchInput;
    this.load_current();
  }
}
export interface Weather{
  city: string,
  image: string,
  sky: string,
  max_temp: number,
  min_temp: number,
  feels: number, 
  humidity: number,
  pressure: number
  moon: string,
  current_temp:number

}

