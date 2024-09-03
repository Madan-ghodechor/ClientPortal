import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  base_url: string = "https://testretail.fleet247.in/api/v4/";
  getCityForSearch(data) {
    return this.http.post(this.base_url + "getCityForSearch", data);
  }
  getOneWayDropDownCity(data) {
    return this.http.post(this.base_url + "getOnewayDropCities", data)
  }

  searchTaxiRoutes(data: any) {
    const da = new FormData()
    da.append("tour_type_id", "0")
    return this.http.post(this.base_url + "getCityForSearch", da);
  }

  getTaxis(data: any) {
    return this.http.post(this.base_url + "searchTaxis", data)
  }
  getTaxisOneWay(data:any){
    return this.http.post(this.base_url+"searchOnewayTaxis", data)
  }

}
