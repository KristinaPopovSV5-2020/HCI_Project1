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
    return this.http.get<any>(environment.apiBaseUrl + 'forecast.json?key=' + environment.apiKey + '&q=' + city + '&aqi=yes&alerts=yes');
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

  getWeatherData(city: string): Observable<any>{
    const today = new Date();
    const threeDaysAgo = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000))
    const sevenDays=new Date()
    const threeYear = threeDaysAgo.getFullYear()
    const threeMonth = threeDaysAgo.getMonth() + 1
    const threeDay = threeDaysAgo.toString().substring(8,11);
    const sevenYear = sevenDays.getFullYear()
    const sevenMonth = sevenDays.getMonth() + 1
    const sevenDay = sevenDays.toString().substring(8,11);
    return this.http.get<any>(environment.apiBaseUrl + 'history.json?key=' + environment.apiKey + '&q=' + city + '&dt='+ threeYear + '-' + threeMonth + '-' + threeDay+'&end_dt='+ sevenYear + '-' + sevenMonth + '-' + sevenDay);
  }
}
