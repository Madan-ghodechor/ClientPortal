import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import Swal from 'sweetalert2';
import { OwlOptions } from 'ngx-owl-carousel-2';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Static Code 
  TodaysDate: Date = new Date();

  divs = [
    { id: 1, show: true, name: 'Local Rental', active: true },
    { id: 2, show: false, name: 'Outstation', active: false },
    { id: 3, show: false, name: 'Multi City', active: false },
    // { id: 4, show: false, name: 'Airport Transfer', active: false },
    // { id: 5, show: false, name: 'Self Drive (Goa)', active: false }
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
  // End Static Codes


  // Dependency Injection 
  formBuilder = inject(FormBuilder);
  // End Dependency Injection 


  constructor() {

    // Rental Local Forms
    this.localRentalForm = this.formBuilder.group({
      pickupCity: ['', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required]
    });
    // End Rental Local Forms

    // Outstation Form
    this.outstationForm = this.formBuilder.group({
      pickupCity: ['', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      returnCity: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
    // End Outstation form

    // Multicity Form
    this.multicityForm = this.formBuilder.group({
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
    // End Multicity form

    // After Api Call The Data Initialize
    this.citiesData = [
      { "id": 1, "Name": "Ahmednagar" },
      { "id": 5, "Name": "Ahmednagar" },
      { "id": 2, "Name": "Nashik" },
      { "id": 3, "Name": "Primpri" },
      { "id": 4, "Name": "Pune" }
    ]
    // End After Api Call The Data Initialize

  }

  // Datas Variables
  citiesData: any = [];
  timesData: any = [];

  // Variables
  filteredCities: Observable<any[]> | undefined;

  localRentalForm: FormGroup;
  outstationForm: FormGroup;
  multicityForm: FormGroup;


  ngOnInit() {
    this.filteredCities = this.localRentalForm.get('pickupCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCity(value || ''))
    );
  }

  // Filter Functions
  private _filterCity(value: any) {
    const filterValue = value.toLowerCase();
    return this.citiesData.filter((option: any) => option.Name.toLowerCase().includes(filterValue));
  }
  // End Filter Functions


  generateTimes(formName: any) {

    this.timesData.splice(0, this.timesData.length);    // It Will Clear All The Time Arrays Data.

    let BookingTime = this.roundTimeQuarterHour(new Date());    // this will RoundUp To the time if 11:53 then it will 11:45 
    BookingTime.setMinutes(BookingTime.getMinutes() + 240);     // to add 4 hours later

    let NextDayBookingTime1stCond = this.roundTimeQuarterHour(new Date());
    NextDayBookingTime1stCond.setHours(7);
    NextDayBookingTime1stCond.setMinutes(0);

    // Next Day Bookings
    let NextDayBookingTime = this.roundTimeQuarterHour(new Date());
    NextDayBookingTime.setHours(10);
    NextDayBookingTime.setMinutes(0);

    switch (formName) {
      case 'localRentalForm':
        if (this.TodaysDate.toLocaleDateString() === this.localRentalForm.value.pickupDate.toLocaleDateString()) {

          if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '00:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '07:00:00') {
            for (let i = 0; i < 96; i++) {
              BookingTime.setMinutes(BookingTime.getMinutes() + 15);
              let Time = BookingTime.toLocaleTimeString();

              if (BookingTime.getHours() == 0)
                break;
              this.timesData.push(Time)

            }
          } else if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) >= '20:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '23:59:59') {
            this.TimeNotAvl()
          } else {

            for (let i = 0; i < 96; i++) {


              if (BookingTime.getHours() == 0)
                break;
              let Time = BookingTime.toLocaleTimeString();

              BookingTime.setMinutes(BookingTime.getMinutes() + 15);
              this.timesData.push(Time)
              console.log
            }
          }


        } else {
          let NdayDate = new Date();
          NdayDate.setDate(NdayDate.getDate() + 1);
          let selectedDate = this.getPreviousDate(this.localRentalForm.value.pickupDate.toLocaleDateString())
          let currentDate = this.getPreviousDateCheck(this.TodaysDate.toLocaleDateString())

          if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '20:00:00' && currentDate == selectedDate) {
            for (let i = 0; i < 68; i++) {

              if (this.timesData > '11:45:00 PM' && this.timesData < '07:00:00 AM')
                break;

              let Time = NextDayBookingTime1stCond.toLocaleTimeString();
              NextDayBookingTime1stCond.setMinutes(NextDayBookingTime1stCond.getMinutes() + 15);
              this.timesData.push(Time)
            }

          } else {
            NextDayBookingTime1stCond.setHours(0);
            NextDayBookingTime1stCond.setMinutes(0);
            for (let i = 0; i < 96; i++) {

              let Time = NextDayBookingTime1stCond.toLocaleTimeString();
              NextDayBookingTime1stCond.setMinutes(NextDayBookingTime1stCond.getMinutes() + 15);
              this.timesData.push(Time)
            }
          }

        }
        break;
      case 'outstationForm':
        this.outstationForm.controls['returnDate'].reset();
        // this.outstationForm.value.pickupDate.reset();
        if (this.TodaysDate.toLocaleDateString() === this.outstationForm.value.pickupDate.toLocaleDateString()) {

          if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '00:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '07:00:00') {
            for (let i = 0; i < 96; i++) {
              BookingTime.setMinutes(BookingTime.getMinutes() + 15);
              let Time = BookingTime.toLocaleTimeString();

              if (BookingTime.getHours() == 0)
                break;
              this.timesData.push(Time)

            }
          } else if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) >= '20:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '23:59:59') {
            this.TimeNotAvl()
          } else {

            for (let i = 0; i < 96; i++) {


              if (BookingTime.getHours() == 0)
                break;
              let Time = BookingTime.toLocaleTimeString();

              BookingTime.setMinutes(BookingTime.getMinutes() + 15);
              this.timesData.push(Time)
              console.log
            }
          }


        } else {
          let NdayDate = new Date();
          NdayDate.setDate(NdayDate.getDate() + 1);
          let selectedDate = this.getPreviousDate(this.outstationForm.value.pickupDate.toLocaleDateString())
          let currentDate = this.getPreviousDateCheck(this.TodaysDate.toLocaleDateString())

          if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '20:00:00' && currentDate == selectedDate) {
            for (let i = 0; i < 68; i++) {

              if (this.timesData > '11:45:00 PM' && this.timesData < '07:00:00 AM')
                break;

              let Time = NextDayBookingTime1stCond.toLocaleTimeString();
              NextDayBookingTime1stCond.setMinutes(NextDayBookingTime1stCond.getMinutes() + 15);
              this.timesData.push(Time)
            }

          } else {
            NextDayBookingTime1stCond.setHours(0);
            NextDayBookingTime1stCond.setMinutes(0);
            for (let i = 0; i < 96; i++) {

              let Time = NextDayBookingTime1stCond.toLocaleTimeString();
              NextDayBookingTime1stCond.setMinutes(NextDayBookingTime1stCond.getMinutes() + 15);
              this.timesData.push(Time)
            }
          }

        }
        break;
      case 'multicityForm':
        break;
    }


    if (this.timesData == '') {
      this.TimeNotAvl()
    }
  }


  // Local Rental Form Submission
  submitLocalRent() {

    // Getting Services Id
    var selectedServiceId: any;
    const selectedService = this.localRentalForm.value.pickupCity;
    const selectedServiceObject = this.citiesData.find((service: any) => service.Name === selectedService);
    if (selectedServiceObject) {
      selectedServiceId = selectedServiceObject.id;
      console.log("service Id " + selectedServiceId)
    }

    console.log(this.localRentalForm.value)
    if (this.localRentalForm.valid)
      this.FormSubmitAlert();
  }


  FleetFeatures: any = [
    {
      img: "https://www.fleet247.in/retail_assets/images/fleet-assets/features-assets/Transparent%20Pricing.png",
      name: "Transparent",
      name2: "Pricing"
    },
    {
      img: "https://www.fleet247.in/retail_assets/images/fleet-assets/features-assets/Dedicated%20Relationship%20Manager.png",
      name: "Dedicated Relationship ",
      name2: "Manager"
    },
    {
      img: "https://www.fleet247.in/retail_assets/images/fleet-assets/features-assets/Quality%20Vehicles.png",
      name: "Quality ",
      name2:"Vehicles"
    },
    {
      img: "https://www.fleet247.in/retail_assets/images/fleet-assets/features-assets/24x7%20Support.png",
      name: "24 X 7 ",
      name2: "Support"
    },
    {
      img: "https://www.fleet247.in/retail_assets/images/fleet-assets/features-assets/Countrywide%20Reach.png",
      name: "Countrywide ",
      name2: "Reach"
    },
    {
      img: "https://www.fleet247.in/retail_assets/images/fleet-assets/features-assets/ProffesionallyTrained%20Drivers.png",
      name: "Professionally  ",
      name2: "Trained Drivers"
    }
  ]

  slidesStore: any = [
    {
      id: 1,
      src: 'https://fleet247.in/retail_assets/images/fleet-assets/Ease_to_travel_assets/Round_trip.svg',
      alt: 'local rental',
      title: 'Local Car Rental',
      discription: 'Depending on the needs of the traveler, we provide multiple car rental choices. You may select a package based on your needs, such as 4 hours/40 kilometers, 8 hours/80 kilometers, or 12 hours/120 kilometers, and the vehicle is all yours. Choose the best package for you to ensure a trouble-free trip.',
    },
    {
      id: 2,
      src: 'https://fleet247.in/retail_assets/images/fleet-assets/Ease_to_travel_assets/Round_trip.svg',
      alt: 'Round Car Rental',
      title: 'Round Car Rental',
      discription: 'Our premium roundtrip cab service lets you enjoy the best of both worlds. With us, you may enjoy everything from a secure classroom setting to an incredibly comfortable trip and back to your front door. With our knowledgeable travel companions, you can have the luckiest of days as we make your trip unique by being perceptive and communicatively astute.',
    },
    {
      id: 3,
      src: 'https://fleet247.in/retail_assets/images/fleet-assets/Ease_to_travel_assets/Multicity.svg',
      alt: 'Multicity Car Rental',
      title: 'Multicity Car Rental',
      discription: 'We care about your needs as much as you do, and our multicity package will take you everywhere you want to travel in India. We provide numerous alternatives based on your travel preferences: adventure or luxury, beach or desert, modern or traditional, North or South India has you covered.',
    },
  ];
  ngAfterViewInit() {
    $('.owl-carousel').owlCarousel({
      items: 3,
      loop: true,
      margin: 10,
      // nav: true,
      autoplay: true,
      dotsEach: false,
      autoplaySpeed: 1050,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        460: {
          items: 2
        },
        768: {
          items: 3
        }
      }
    });
  }



  private roundTimeQuarterHour(time: any) {
    var timeToReturn = new Date(time);

    timeToReturn.setMilliseconds(Math.round(timeToReturn.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);

    return timeToReturn;
  }
  private formatDateTimeToYYYYMMDDHHMMSS(dateString: any) {
    // Create a Date object from the given date string
    let date = new Date(dateString);

    // Extract year, month, date, hours, minutes, and seconds
    let year: any = date.getFullYear();
    let month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns month from 0-11
    let day: any = date.getDate().toString().padStart(2, '0');
    let hours: any = date.getHours().toString().padStart(2, '0');
    let minutes: any = date.getMinutes().toString().padStart(2, '0');
    let seconds: any = date.getSeconds().toString().padStart(2, '0');

    // Concatenate into YYYY-MM-DD HH:MM:SS format
    return `${hours}:${minutes}:${seconds}`;
  }

  private formatDate(datestring: any) {

    const yyyy = datestring.getFullYear();
    let mm = datestring.getMonth() + 1; // Months start at 0!
    let dd = datestring.getDate() + 1;

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
  }

  private getPreviousDate(dateStr: any) {

    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);

    const previousMonth = date.getMonth() + 1;
    const previousDay = date.getDate();
    const previousYear = date.getFullYear();

    const formattedMonth = previousMonth < 10 ? `0${previousMonth}` : previousMonth;
    const formattedDay = previousDay < 10 ? `0${previousDay}` : previousDay;

    const previousDateStr = `${formattedMonth}/${formattedDay}/${previousYear}`;
    return previousDateStr;
  }
  private getPreviousDateCheck(dateStr: any) {

    const date = new Date(dateStr);
    date.setDate(date.getDate());

    const previousMonth = date.getMonth() + 1;
    const previousDay = date.getDate();
    const previousYear = date.getFullYear();

    const formattedMonth = previousMonth < 10 ? `0${previousMonth}` : previousMonth;
    const formattedDay = previousDay < 10 ? `0${previousDay}` : previousDay;

    const previousDateStr = `${formattedMonth}/${formattedDay}/${previousYear}`;
    return previousDateStr;
  }



  // Sweet Alerts 
  TimeNotAvl() {
    Swal.fire({
      title: '',
      html: `
        <p> Select Date ${this.formatDate(this.localRentalForm.value.pickupDate)} For Book Taxi,</p>
        Or For Emergency Bookings Contact on <a href="tel:+919309804106" > +91 9309804106 </a>
       `,

      confirmButtonText: 'Ok'
    })
  }
  FormSubmitAlert() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    })
  }


}

