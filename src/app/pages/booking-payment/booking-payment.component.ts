import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrl: './booking-payment.component.scss'
})
export class BookingPaymentComponent implements OnInit {

  // ------------------ Designing Method's ------------------ //
  divs = [
    { id: 1, show: true, name: 'User Details', active: true },
    { id: 2, show: false, name: 'Passenger Details', active: false },
    { id: 3, show: false, name: 'Pickup/GST Details', active: false },
    { id: 4, show: false, name: 'Payment Information', active: false }
  ];
  toggleDiv(id: number) {
    window.scrollTo(0, 0);
    this.divs.forEach(div => {
      div.show = div.id === id;
    });
  }
  setActiveButton(id: number) {
    this.divs.forEach(div => {
      div.active = div.id === id;
    });
  }

  loginMethods = [
    { id: 1, show: true, name: 'Login With Email', active: true },
    { id: 2, show: false, name: 'Login With OTP', active: false },
    { id: 3, show: false, name: 'Forget', active: false },
    { id: 4, show: false, name: 'new-account', active: false },
  ];
  toggleLogin(id: number) {
    window.scrollTo(0, 0);
    this.loginMethods.forEach(div => {
      div.show = div.id === id;
    });
  }
  setActiveLogin(id: number) {
    this.loginMethods.forEach(div => {
      div.active = div.id === id;
    });
  }

  loginPassShow: boolean = false;
  login_input: string = "password";

  newUserPassShow: boolean = false;
  newUser_input: string = "password";

  newConfirmPassShow: boolean = false;
  newConfirm_input: string = "password";

  showPassword(da: string) {
    if (da == "login_pass") {
      this.loginPassShow = !this.loginPassShow;
      if (this.loginPassShow)
        this.login_input = 'text'
      else
        this.login_input = 'password'
    }
    if (da == "new_user_pass") {
      this.newUserPassShow = !this.newUserPassShow;
      if (this.newUserPassShow)
        this.newUser_input = 'text'
      else
        this.newUser_input = 'password'
    }
    if (da == "new_user_pass_confirm") {
      this.newConfirmPassShow = !this.newConfirmPassShow;
      if (this.newConfirmPassShow)
        this.newConfirm_input = 'text'
      else
        this.newConfirm_input = 'password'
    }

  }

  hideShowLoginHeader: boolean = true;
  manageLinks(da: string) {
    this.hideShowLoginHeader = false;
    if (da == "forget-password") {
      this.toggleLogin(3)
    }
    if (da == "login") {
      this.toggleLogin(1)
      this.hideShowLoginHeader = true;
    }
    if (da == "create-new") {
      this.toggleLogin(4);
      this.hideShowLoginHeader = false;
    }
  }
  // ------------------ End Designing Method's ------------------ //


  isDropdownOpen = false;
  selectedOption: any = { "id": 75, "name": "India", "code": "+91", "flag": "fi fi-in" };
  selectedOptionNewUser: any = { "id": 75, "name": "India", "code": "+91", "flag": "fi fi-in" };
  countries: any;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }
  closeDropdown() {
    if (this.selectedOption == '') {
      this.selectedOption = "+91"
    }
    this.isDropdownOpen = false; // Close dropdown
  }
  selectOption(data: any) {
    this.selectedOption = data;
    this.closeDropdown();
  }
  selectOptionNewUser(data: any) {
    this.selectedOptionNewUser = data;
    this.closeDropdown();
  }


  http = inject(HttpClient);
  helpers = inject(HelpersService);
  ngOnInit() {
    this.http.get("https://restcountries.com/v3.1/all").subscribe((res: any) => {
      this.countries = res
    })
  }


}
