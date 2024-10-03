import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RazorpayService } from '../../services/razorpay.service';


declare const _callPickupLocation: any;
declare const _returnPickupLocation: any;


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

  // ------------------ Dependency Injections ------------------ //
  http = inject(HttpClient);
  helpers = inject(HelpersService);
  fb = inject(FormBuilder);
  api = inject(ApiService);
  router = inject(Router)



  // ------------------ Form Group's ------------------ //
  LoginForm: FormGroup;
  LoginWithOtp: FormGroup;
  ConfirmOtpForm: FormGroup;
  resetPassword: FormGroup;
  signupUserForm: FormGroup;

  userDetailsForm: FormGroup;
  pickupGstDetailsForm: FormGroup;
  paymentInfoForm: FormGroup;

  userDetails: any = null;
  loggedIn = true;

  ngOnInit() {
    const da = JSON.parse(localStorage.getItem('user_details'));
    this.userDetails = da.user
    console.log(da.user)
    // if (da.user=='' || da.user==null) {
    // } else {
    //   this.userDetailsSkip = false;
    // }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*()_+[\]{}|;:,.<>?])(?!.*\s).{8,}$/;
    const contactNoPattern = /^[0-9]{10}$/;


    this.LoginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')]],
      password: ['', [Validators.required]],
      terms_and_cond: ['', [Validators.required]],
    });
    this.LoginWithOtp = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern(contactNoPattern)]],
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
      contact_no: ['', [Validators.required, Validators.pattern(contactNoPattern)]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirm: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      check: ['', [Validators.required]],
    })

    this.userDetailsForm = this.fb.group({
      full_name: ['Madan Ghodechor', Validators.required],
      phone: ['9309804106', Validators.required],
      email: ['madan.ghodechor@taxivaxi.com', Validators.required],
    })
    this.pickupGstDetailsForm = this.fb.group({
      pickupCity: ['', [Validators.required]],
      pickupLocation: ['', [Validators.required]],
    })
    this.paymentInfoForm = this.fb.group({
      paymentOption: ['', Validators.required],
      terms_and_cond: ['', Validators.required],
    })

    this.setResponse()

  }
  setResponse(){
    let data = JSON.parse(localStorage.getItem('SearchForm'))
    this.pickupGstDetailsForm.controls['pickupCity'].setValue(data.pickupCity)
  }

  //------------------------ Google Places AutoComple ------------------------//
  pickupLocation
  callExternalFunction(da: any) {
    _callPickupLocation(da, 'Pune'); 
  }
  getResponse(id: string) {
    setTimeout(() => {
      this.pickupLocation = _returnPickupLocation(id)
      console.log(this.pickupLocation)
      this.pickupGstDetailsForm.controls['pickupLocation'].setValue(this.pickupLocation)
    }, 200)
  }
  //------------------------ Google Places AutoComple ------------------------//


  // ------------------ Password Match ------------------ //
  passwordMissMatch = false;
  getPasswordMatched() {
    if (this.signupUserForm.value.password == this.signupUserForm.value.confirm) {
      this.passwordMissMatch = false;
    }
    else {
      this.passwordMissMatch = true;
    }
  }


  // ------------------ Form Submissions ------------------ //
  submitLoginForm() {
    if (this.LoginForm.valid) {
      const data = new FormData();
      data.append("email", this.LoginForm.value.username);
      data.append("password", this.LoginForm.value.password);
      console.log(this.LoginForm.value)

      this.api.getLoggedIn(data).subscribe((res: any) => {
        if (res.success == "true") {
          console.log(res)
          localStorage.setItem("user_details", JSON.stringify(res.data));
          localStorage.setItem("Access_Token", JSON.stringify(res.data.access_token));
          this.ngOnInit()
          this.helpers.autoHideSweetAlert("success", "Logged In Successfully")
        }
      })
    }
  }
  hideShowOtpForm: boolean = false
  submitLoginWithOtp() {
    if (this.LoginWithOtp.valid) {
      this.hideShowOtpForm = true;
      const data = new FormData();
      data.append("contact_no", this.LoginWithOtp.value.mobileNumber);
      console.log(this.LoginWithOtp.value)

      this.api.getOtp(data).subscribe((res: any) => {
        if (res.success == "true") {
          console.log(res)
          this.helpers.autoHideSweetAlert("success", "Otp Sent Successfully")
        }
      })
    }
  }
  submitConfirmOtp() {
    if (this.ConfirmOtpForm.valid) {
      console.log(this.ConfirmOtpForm.value)
      const data = new FormData()
      data.append("contact_no", this.LoginWithOtp.value.mobileNumber);
      data.append("otp", this.ConfirmOtpForm.value.otp);

      this.api.getVerifyOtp(data).subscribe((res: any) => {
        if (res.success == "true") {
          console.log(res)
          localStorage.setItem("user_details", JSON.stringify(res.data));
          localStorage.setItem("Access_Token", JSON.stringify(res.data.access_token));
          this.helpers.autoHideSweetAlert("success", "Otp Verified Successfully")
          this.ngOnInit()
        }
      })
    }
  }
  submitResetPasswordForm() {
    if (this.resetPassword.valid) {
      console.log(this.resetPassword.value)

      const data = new FormData()
      data.append("email", this.resetPassword.value.username);

      this.api.getForgetPassword(data).subscribe((res: any) => {
        if (res.success == "true") {
          console.log(res)
          this.helpers.autoHideSweetAlert("success", "Send Has Been Sent On Email")
        }
      })
    }
  }
  submitSignUpForm() {
    if (this.signupUserForm.valid && !this.passwordMissMatch) {
      console.log(this.signupUserForm.value)

      const data = new FormData();
      data.append("email", this.signupUserForm.value.email);
      data.append("password", this.signupUserForm.value.password);
      data.append("name", this.signupUserForm.value.first_name + " " + this.signupUserForm.value.last_name);
      data.append("contact_no", this.signupUserForm.value.contact_no);

      this.api.getSignUp(data).subscribe((res: any) => {
        if (res.success == "true") {
          this.helpers.autoHideSweetAlert("success", "New User Added Successfully !")
          console.log(res);
        }
      })
    }
  }

  razorpay = inject(RazorpayService)
  OpenRazorModal() {
    this.razorpay.openCheckout();
  }


}