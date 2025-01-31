import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  base_url: String = "https://fleet247.in/api/v4/";
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
  getTaxisOneWay(data: any) {
    return this.http.post(this.base_url + "searchOnewayTaxis", data)
  }



  // ------------------    Booking Details Api's    ------------------ //
  getLoggedIn(da: any) {
    return this.http.post(this.base_url + "login", da);
  }
  getOtp(da: any) {
    return this.http.post(this.base_url + "getOtp", da);
  }
  getVerifyOtp(da: any) {
    return this.http.post(this.base_url + "verifyLoginOtp", da);
  }
  getForgetPassword(da: any) {
    return this.http.post(this.base_url + "forgetPassword", da);
  }
  getSignUp(da: any) {
    return this.http.post(this.base_url + "addUser", da);
  }
  sendCodeToVerifyContact(da: any) {
    return this.http.post(this.base_url + "resendVerificationCode", da);
  }
  getContactNumberVerify(da: any) {
    return this.http.post(this.base_url + "validateContact", da);
  }
  sendCodeToVerifyMail(da: any) {
    return this.http.post(this.base_url + "resendEmailVerificationCode", da);
  }
  getMailAddressVerify(da: any) {
    return this.http.post(this.base_url + "verifyEmail", da);
  }


  recordTrip(da: any) {
    return this.http.post(this.base_url + "recordTrip", da)
  }
}
