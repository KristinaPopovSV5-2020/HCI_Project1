import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('myDropdownMenu', { static: false })
  dropdownMenuRef!: ElementRef;
  @ViewChild('myInput', { static: false })
  inputRef!: ElementRef;

  city!: string;

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
          })
          .catch(error => console.error(error));
      });
    }
  }


  autocomplete() {
    if (this.searchInput.length > 0) {
      this.dropdownMenuRef.nativeElement.classList.add('show');
      console.log("aaa")
      this.autocompleteService.getPlacePredictions({ input: this.searchInput },
        (predictions: any[], status: string) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.predictions = predictions.map(prediction => {
              return { description: prediction.description, place_id: prediction.place_id };
            });
          } else {
            console.log("bbb")
            this.predictions = [];
          }
        });
    } else {
      console.log("ccc")
      this.predictions = [];
    }
    
  }

elements = Array.from({length: 10}, (_, i) => i + 1);
  selectCity(prediction: { description: string, place_id: string }) {
    this.searchInput = prediction.description;
    this.predictions = [];
    // do something with the selected city, e.g. navigate to a new page
  }
}
