import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  

  constructor(
    private http: HttpClient
  ) { }



  getWeatherCurrentData(city: string): Observable<any>{
    return this.http.get<any>(environment.apiBaseUrl + 'current.json?key=' + environment.apiKey + '&q=' + city + '&aqi=no');
  }


  getWeatherNextData(city: string, days: number): Observable<any>{
    return this.http.get<any>(environment.apiBaseUrl + 'forecast.json?key=' + environment.apiKey + '&q=' + city + '&days=' + days + '&aqi=no&alerts=no');
  }


  getWeatherHistoryData(city: string, date: Date): Observable<any>{
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDay()
    return this.http.get<any>(environment.apiBaseUrl + 'history.json?key=' + environment.apiKey + '&q=' + city + '&dt='+ year + '-' + month + '-' + day);
  }
}
