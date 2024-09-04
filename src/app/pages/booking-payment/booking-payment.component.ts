import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrl: './booking-payment.component.scss'
})
export class BookingPaymentComponent implements OnInit, AfterViewInit {

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
    this.hideShowOtpForm = false;
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
  fb = inject(FormBuilder)



  // ------------------ Form Group's ------------------ //
  LoginForm: FormGroup;
  LoginWithOtp: FormGroup;
  ConfirmOtpForm: FormGroup;
  resetPassword: FormGroup;
  signupUserForm: FormGroup;

  userDetailsForm: FormGroup;

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('user_details'));


    this.LoginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')]],
      password: ['', [Validators.required]],
      terms_and_cond: ['', [Validators.required]],
    });
    this.LoginWithOtp = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
    this.ConfirmOtpForm = this.fb.group({
      otp: ['', Validators.required]
    })
    this.resetPassword = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')]], 
    })
    this.signupUserForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')]],
      contact_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    })
    this.userDetailsForm = this.fb.group({
      full_name : ['', Validators.required],
      phone : ['', Validators.required],
      email : ['', Validators.required],
    })

  }
  userDetails:any = null;
  ngAfterViewInit() {
    // sessionStorage.setItem("user_details",JSON.stringify({"user":"madan", "access_token":"1234567890987654321"}))
    // this.userDetails = JSON.parse(sessionStorage.getItem('user_details'));
    // console.log(this.userDetails)
  }


  // ------------------ Form Submissions ------------------ //
  submitLoginForm(){
    if(this.LoginForm.valid){
      console.log(this.LoginForm.value)
    }
  }
  hideShowOtpForm: boolean = false
  submitLoginWithOtp(){
    if(this.LoginWithOtp.valid){
      this.hideShowOtpForm = true;
      console.log(this.LoginWithOtp.value)
    }
  }
  submitConfirmOtp(){
    if(this.ConfirmOtpForm.valid){
      console.log(this.ConfirmOtpForm.value)
    }
  }
  submitResetPasswordForm(){
    if(this.resetPassword.valid){
      console.log(this.resetPassword.value)
    }
  }
  submitSignUpForm(){
    if(this.signupUserForm.valid){
      console.log(this.signupUserForm.value)
    }
  }

}
