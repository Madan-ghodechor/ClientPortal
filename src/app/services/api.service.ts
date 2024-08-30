import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  base_url:string = "https://testretail.fleet247.in/api/v4/";
  getCityForSearch(){
    const data = new FormData()
    data.append("tour_type_id", "0")
    return this.http.post(this.base_url+"getCityForSearch", data);
  }

  // base_url:string = "https://testretail.fleet247.in/api/v5/";
  // getCityForSearch(){

  //   const data = new FormData()
  //   data.append("username", "sonalimagar0110@gmail.com")
  //   data.append("password", "test123")

  //   return this.http.post(this.base_url+"login", data);
  // }

}
