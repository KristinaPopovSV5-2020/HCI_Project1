import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MatDialog } from '@angular/material/dialog';
import { HistoryComponent } from '../history/history.component';


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
  hours: Hourly[] = [];

  @ViewChild('myDropdownMenu', { static: false })
  dropdownMenuRef!: ElementRef;
  @ViewChild('myInput', { static: false })
  inputRef!: ElementRef;

  city!: string;

  result:any;
  forecastDays:Daily[]=[];

  alert:boolean;

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
    moon: '', 
    current_temp:0,
    uv: 0,
    sunrise: '',
    sunset:'',
    wind_kph:'',
    wind_dir:'',
    vis_km:'',
    us_epa_index: 0,
    alerts: {
      event: '',
      desc: '',
    }
    
  }

  constructor(weatherService:WeatherService,
    private dialog:MatDialog){this.weatherService=weatherService, this.alert = false}
  count = 0;
  inc = 0;
  margin = 0;
  slider!: HTMLElement;
  itemDisplay = 0;
  itemleft = 0;
  itemslide = 0;

  count1 = 0;
  inc1 = 0;
  margin1 = 0;
  slider1!: HTMLElement;
  itemDisplay1 = 0;
  itemleft1 = 0;
  itemslide1 = 0;



  ngOnInit() {
    this.slider = document.getElementsByClassName("slider-width")[0] as HTMLElement;
    this.slider1 = document.getElementsByClassName("slider-width1")[0] as HTMLElement;

    if (screen.width > 990) {
      this.itemDisplay = Number(document.getElementsByClassName("slider-container")[0].getAttribute("item-display-d"));
      this.margin = this.itemDisplay * 5;
    }

    if (screen.width > 700 && screen.width < 990) {
      this.itemDisplay = Number(document.getElementsByClassName("slider-container")[0].getAttribute("item-display-t"));
      this.margin = this.itemDisplay * 6.8;
    }

    if (screen.width > 280 && screen.width < 700) {
      this.itemDisplay = Number(document.getElementsByClassName("slider-container")[0].getAttribute("item-display-m"));
      this.margin = this.itemDisplay * 20;
    }

    

    //drugii
    if (screen.width > 990) {
      this.itemDisplay1 = Number(document.getElementsByClassName("slider-container1")[0].getAttribute("item-display-d"));
      this.margin1 = this.itemDisplay1 * 5;
    }

    if (screen.width > 700 && screen.width < 990) {
      this.itemDisplay1 = Number(document.getElementsByClassName("slider-container1")[0].getAttribute("item-display-t"));
      this.margin1 = this.itemDisplay1 * 6.8;
    }

    if (screen.width > 280 && screen.width < 700) {
      this.itemDisplay1 = Number(document.getElementsByClassName("slider-container1")[0].getAttribute("item-display-m"));
      this.margin1 = this.itemDisplay1 * 20;
    }

    
    
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBYIxH4GweMZM_xgfqeRkrpO_gjJg7IUNA`;
       
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const cityResult = data.results.find((result: { types: string | string[]; }) => result.types.includes('locality'));
            this.city = cityResult.address_components[0].long_name;
            this.weatherService.getWeatherCurrentData(this.city).subscribe((res) =>{
              
              this.load_forecast_days();
              this.load_hourly();
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
                current_temp:res.current.temp_c,
                uv:res.current.uv,
                sunrise:res.forecast.forecastday[0].astro.sunrise,
                sunset:res.forecast.forecastday[0].astro.sunset,
                wind_kph:res.current.wind_kph,
                wind_dir:res.current.wind_dir,
                vis_km:res.current.vis_km,
                us_epa_index:res.current.air_quality['us-epa-index'],
                alerts:res.alerts.alert[0]
    
              }
              this.adjustTextColor();
              

              
        
             })

          })
          .catch(error => console.error(error));
      });
    }
  
   
  }

  openNavbar() {
    const toggleButton = document.querySelector('.navbar-toggler')!;
    const navbarLinks = document.querySelector('#navbarContent')!;

    navbarLinks.classList.toggle('show');

  }
  


  nextt(){
    if (this.inc !== this.itemslide + this.itemleft) {
      if (this.inc === this.itemslide) {
        this.inc = this.inc + this.itemleft;
        this.count = this.count - ((screen.width*0.7) / this.itemDisplay) * this.itemleft;
      } else {
        this.inc++;
        this.count = this.count - (screen.width*0.7);
      }
    }
    this.slider.style.left = this.count + "px";
  }


  nextt1(){
    if (this.inc1 !== this.itemslide1 + this.itemleft1) {
      if (this.inc1 === this.itemslide1) {
        this.inc1 = this.inc1 + this.itemleft1;
        this.count1 = this.count1 - ((screen.width*0.7) / this.itemDisplay1) * this.itemleft1;
      } else {
        this.inc1++;
        this.count1 = this.count1 - (screen.width*0.7);
      }
    }
    this.slider1.style.left = this.count1 + "px";
  }

  previous(): void {
    if (this.inc !== 0) {
      if (this.inc == this.itemleft) {
        this.inc = this.inc - this.itemleft;
        this.count = this.count + ((screen.width*0.7) / this.itemDisplay) * this.itemleft;
      } else {
        this.inc--;
        this.count = this.count + (screen.width*0.7);
      }
    }
    console.log(this.inc);
    this.slider.style.left = this.count + "px";
  }

  previous1(): void {
    if (this.inc1 !== 0) {
      if (this.inc1 == this.itemleft1) {
        this.inc1 = this.inc1 - this.itemleft1;
        this.count1 = this.count1 + ((screen.width*0.7) / this.itemDisplay1) * this.itemleft1;
      } else {
        this.inc1--;
        this.count1 = this.count1 + (screen.width*0.7);
      }
    }
    this.slider1.style.left = this.count1 + "px";
  }

  load_hourly(){
    this.hours=[]
    this.weatherService.getWeatherNextData(this.city, 0).subscribe((res) =>{
      for (let i = 0; i<24; i++){
        let time = res.forecast.forecastday[0].hour[i].time.split(" ", 2)[1];
        let hour = {time: time, temp_c:res.forecast.forecastday[0].hour[i].temp_c, icon:res.forecast.forecastday[0].hour[i].condition.icon  };
        this.hours.push(hour);
      }
      this.itemleft = this.hours.length % this.itemDisplay;
      this.itemslide = Math.floor(this.hours.length / this.itemDisplay) - 1;
      console.log(this.itemDisplay)
      console.log(this.itemslide)
      console.log(this.itemleft)
     })
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
        current_temp:res.current.temp_c,
        uv:res.current.uv,
        sunrise:res.forecast.forecastday[0].astro.sunrise,
        sunset:res.forecast.forecastday[0].astro.sunset,
        wind_kph:res.current.wind_kph,
        wind_dir:res.current.wind_dir,
        vis_km:res.current.vis_km,
        us_epa_index:res.current.air_quality['us-epa-index'],
        alerts:res.alerts.alert[0]
      }
      this.load_hourly();
      this.load_forecast_days();
      this.adjustTextColor();  
     })

  }
  adjustTextColor() {
    
    const uvIndexElement = document.getElementById('uvIndex')!;

    if (this.currentWeather.uv >= 1 && this.currentWeather.uv <= 2) {
      uvIndexElement.style.color = '#95E06C';
      uvIndexElement.style.fontSize = '1.875rem';
      uvIndexElement.textContent = 'Low';
    } else if (this.currentWeather.uv >= 3 && this.currentWeather.uv <= 5) {
      uvIndexElement.style.color = '#EDB230';
      uvIndexElement.style.fontSize = '20px';
      uvIndexElement.textContent = 'Moderate';
    } else if (this.currentWeather.uv >= 6 && this.currentWeather.uv <= 7) {
      uvIndexElement.style.color = '#DB5461';
      uvIndexElement.style.fontSize = '1.875rem';
      uvIndexElement.textContent = 'High';
    } else if (this.currentWeather.uv >= 8) {
      uvIndexElement.style.color = '#DB5461';
      uvIndexElement.style.fontSize = '20px';
      uvIndexElement.textContent = 'Very high';
    }

    const healthConcernElement = document.getElementById('healthConcern')!;
    const aqiIndexElement = document.getElementById('aqiIndex')!;

    if (this.currentWeather.us_epa_index === 1) {
      healthConcernElement.style.color = '#95E06C';
      healthConcernElement.style.fontSize = '1.875rem';
      healthConcernElement.textContent = 'Good';
      aqiIndexElement.textContent = '0-50';
    } else if (this.currentWeather.us_epa_index === 2) {
      healthConcernElement.style.color = '#EDB230';
      healthConcernElement.style.fontSize = '20px';
      healthConcernElement.textContent = 'Moderate';
      aqiIndexElement.textContent = '51-100';
    } else if (this.currentWeather.us_epa_index === 3) {
      healthConcernElement.style.color = '#DB5461';
      healthConcernElement.style.fontSize = '15px';
      healthConcernElement.textContent = 'Unhealthy for sensitive group';
      aqiIndexElement.textContent = '101-150';
    } else if (this.currentWeather.us_epa_index === 4) {
      healthConcernElement.style.color = '#DB5461';
      healthConcernElement.style.fontSize = '20px';
      healthConcernElement.textContent = 'Unhealthy';
      aqiIndexElement.textContent = '151-200';
    } else if (this.currentWeather.us_epa_index === 5) {
      healthConcernElement.style.color = '#DB5461';
      healthConcernElement.style.fontSize = '20px';
      healthConcernElement.textContent = 'Very Unhealthy';
      aqiIndexElement.textContent = '201-300';
    } else if (this.currentWeather.us_epa_index === 6) {
      healthConcernElement.style.color = '#DB5461';
      healthConcernElement.style.fontSize = '20px';
      healthConcernElement.textContent = 'Hazardous';
      aqiIndexElement.textContent = '301+';
    }

    this.checkForAlerts();
    

  }

  checkForAlerts() {
    const alertWindow = document.getElementById('alertWindow');
   
    if (typeof this.currentWeather.alerts?.desc === 'undefined') {
      this.alert = false;
      if (alertWindow !=null) {
        alertWindow.style.display = 'none';
      }
    } else {
      this.alert = true;
      if (alertWindow !=null) {
        alertWindow.style.display = 'block';
      }
    } 
  }

  scrollToDaily() {
    const dailyForecast = document.getElementById('daily')!;
    dailyForecast.scrollIntoView({ behavior: 'smooth' });
  }

  load_forecast_days(){
    this.forecastDays=[];
    let history=this.weatherService.getWeatherData(this.city).subscribe((res)=> {
      for (let i = 0; i < res.forecast.forecastday.length; i++) {
        if (i == res.forecast.forecastday.length-1){
          let time = res.forecast.forecastday[i].hour[i].time.split(" ", 2)
        let weather:Daily={
          day: "Today",
          date: time[0],
          icon: res.forecast.forecastday[i].day.condition.icon,
          max_temp: res.forecast.forecastday[i].day.maxtemp_c,
          min_temp: res.forecast.forecastday[i].day.mintemp_c,
          
        }
        this.forecastDays.push(weather);
          

        }else{
          let time = res.forecast.forecastday[i].hour[i].time.split(" ", 2)
        let newDate = new Date(res.forecast.forecastday[i].hour[i].time);
        let weather:Daily={
          day: newDate.toLocaleDateString('EN-us', {weekday: 'short'}),
          date: time[0],
          icon: res.forecast.forecastday[i].day.condition.icon,
          max_temp: res.forecast.forecastday[i].day.maxtemp_c,
          min_temp: res.forecast.forecastday[i].day.mintemp_c,
          
        }
        this.forecastDays.push(weather);
        }
        
      }
      let next=this.weatherService.getWeatherNextData(this.city,7).subscribe((res)=> {
        for (let i = 1; i < res.forecast.forecastday.length; i++) {
          let date = res.forecast.forecastday[i].date;
          let newDate = new Date(date);
          let weather:Daily={
            day: newDate.toLocaleDateString('EN-us', {weekday: 'short'}),
            date: res.forecast.forecastday[i].date,
            icon: res.forecast.forecastday[i].day.condition.icon,
            max_temp: res.forecast.forecastday[i].day.maxtemp_c,
            min_temp: res.forecast.forecastday[i].day.mintemp_c,
          }
          this.forecastDays.push(weather);
        }
        this.itemleft1 = this.forecastDays.length % this.itemDisplay1;
    this.itemslide1 = Math.floor(this.forecastDays.length / this.itemDisplay1) - 1;
      })

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

  onSelect(date: string){
    if (new Date(date) >= new Date()){
      this.weatherService.getWeatherNextData(this.city, 7 ).subscribe((res) =>{
        for (let i = 1; i < res.forecast.forecastday.length; i++){
          if (date == res.forecast.forecastday[i].date){
            let weather: HistoryDetails = {
              city: this.city,
              date: res.forecast.forecastday[i].date,
              maxtemp_c: res.forecast.forecastday[i].day.maxtemp_c,
              mintemp_c: res.forecast.forecastday[i].day.mintemp_c,
              avgtemp_c: res.forecast.forecastday[i].day.avgtemp_c,
              maxwind_kph: res.forecast.forecastday[i].day.maxwind_kph,
              totalprecip_mm: res.forecast.forecastday[i].day.totalprecip_mm,
              avgvis_km: res.forecast.forecastday[i].day.avgvis_km,
              avghumidity: res.forecast.forecastday[i].day.avghumidity,
              uv: res.forecast.forecastday[i].day.uv,
              icon: res.forecast.forecastday[i].day.condition.icon,
              text: res.forecast.forecastday[i].day.condition.text,
              sunrise: res.forecast.forecastday[i].astro.sunrise,
              sunset: res.forecast.forecastday[i].astro.sunset,
              moonrise: res.forecast.forecastday[i].astro.moonrise,
              moonset: res.forecast.forecastday[i].astro.moonset
            }
            const dialogRef = this.dialog.open(HistoryComponent, {
              data: weather,
              hasBackdrop: true,
            });

          }
        }
       })

    }else{
      this.weatherService.getWeatherHistoryData(this.city, date).subscribe((res) =>{
        console.log(res)
        let weather: HistoryDetails = {
          city: this.city,
          date: res.forecast.forecastday[0].date,
          maxtemp_c: res.forecast.forecastday[0].day.maxtemp_c,
          mintemp_c: res.forecast.forecastday[0].day.mintemp_c,
          avgtemp_c: res.forecast.forecastday[0].day.avgtemp_c,
          maxwind_kph: res.forecast.forecastday[0].day.maxwind_kph,
          totalprecip_mm: res.forecast.forecastday[0].day.totalprecip_mm,
          avgvis_km: res.forecast.forecastday[0].day.avgvis_km,
          avghumidity: res.forecast.forecastday[0].day.avghumidity,
          uv: res.forecast.forecastday[0].day.uv,
          icon: res.forecast.forecastday[0].day.condition.icon,
          text: res.forecast.forecastday[0].day.condition.text,
          sunrise: res.forecast.forecastday[0].astro.sunrise,
          sunset: res.forecast.forecastday[0].astro.sunset,
          moonrise: res.forecast.forecastday[0].astro.moonrise,
          moonset: res.forecast.forecastday[0].astro.moonset
        }
        const dialogRef = this.dialog.open(HistoryComponent, {
          data: weather,
          hasBackdrop: true,
        });
       })
    }
  }

  getCurrentLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBYIxH4GweMZM_xgfqeRkrpO_gjJg7IUNA`;
       
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const cityResult = data.results.find((result: { types: string | string[]; }) => result.types.includes('locality'));
            this.city = cityResult.address_components[0].long_name;
            this.weatherService.getWeatherCurrentData(this.city).subscribe((res) =>{
              
              this.load_forecast_days();
              this.load_hourly();
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
                current_temp:res.current.temp_c,
                uv:res.current.uv,
                sunrise:res.forecast.forecastday[0].astro.sunrise,
                sunset:res.forecast.forecastday[0].astro.sunset,
                wind_kph:res.current.wind_kph,
                wind_dir:res.current.wind_dir,
                vis_km:res.current.vis_km,
                us_epa_index:res.current.air_quality['us-epa-index'],
                alerts:res.alerts.alert[0]
    
              }
              this.adjustTextColor();
              

              
        
             })

          })
          .catch(error => console.error(error));
      });
  }
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
  current_temp:number,
  uv: number,
  sunrise:string,
  sunset:string,
  wind_kph:string,
  wind_dir:string,
  vis_km:string,
  us_epa_index: number,
  alerts: Alert,
}

export interface Alert{
  event: string,
  desc: string,
}
export interface Hourly{
  time: string,
  temp_c: number,
  icon: string
}


export interface Daily{
  day: string,
  date: string,
  icon: string,
  max_temp: string,
  min_temp: number,
}

export interface HistoryDetails{
  city: string,
  date: string,
  maxtemp_c: number,
  mintemp_c: number,
  avgtemp_c: number,
  maxwind_kph: number,
  totalprecip_mm: number,
  avgvis_km: number,
  avghumidity: number,
  uv: number,
  icon: string,
  text: string,
  sunrise: string,
  sunset: string,
  moonrise: string,
  moonset: string
}

export interface Hourly{
  time: string,
  temp_c: number,
  icon: string
}

