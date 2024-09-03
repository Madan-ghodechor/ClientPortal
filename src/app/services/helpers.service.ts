import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  // searchFormData:any = {pickupCity: 'Pune, Maharashtra', pickupDate: '2024-09-02', pickupTime: '2:00:00 AM'};
  searchFormData: any;

  storeSearchFormData(data: any) {
    let obj: { [key: string]: any } = {};

    data.forEach((val: any, index: number) => {
      obj[index] = val;  // Use the index as the key
    });

    this.searchFormData = obj;
  }
  autoHideSweetAlert(icon, message) {
    Swal.fire({
      position: "center",
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  convertCitiesHyfan(city: string) {
    // console.log(city);

    const parts = city.split(', ');

    // Join the parts with a hyphen
    return parts.join('-');
  }
}
