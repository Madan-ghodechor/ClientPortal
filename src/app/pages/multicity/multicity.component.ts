
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import Swal from 'sweetalert2';
import { TimelogicService } from '../../services/timelogic.service';
import { ApiService } from '../../services/api.service';
import moment from 'moment';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare const CallMaps: any;
declare const CallMaps_city2: any;
declare const CallMaps_city3: any;
declare const CallMaps_city4: any;
declare const CallMaps_city5: any;

declare const MapsReturn: any;
declare const multicity_city2: any;
declare const multicity_city3: any;
declare const multicity_city4: any;
declare const multicity_city5: any;

declare var $: any;

@Component({
  selector: 'app-multicity',
  templateUrl: './multicity.component.html',
  styleUrl: './multicity.component.scss'
})
export class MulticityComponent implements AfterViewInit {
  // Static Code 
  TodaysDate: Date = new Date();

  divs = [
    { id: 1, show: true, name: 'Local Rental', active: true },
    { id: 2, show: false, name: 'Outstation', active: false },
    { id: 3, show: false, name: 'Airport Transfer', active: false }
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

  outstationTabs = [
    { id: 1, show: true, name: 'One Way', active: true },
    { id: 2, show: false, name: 'Round Trip', active: false },
    { id: 3, show: false, name: 'Multi City', active: false },
  ];

  toggleForms(id: number) {
    window.scrollTo(0, 0);
    this.outstationTabs.forEach(div => {
      div.show = div.id === id;
    });
  }
  setActiveForm(id: number) {
    this.outstationTabs.forEach(div => {
      div.active = div.id === id;
    });
  }

  // End Static Codes

  // Dependency Injection 
  formBuilder = inject(FormBuilder);
  timeLogic = inject(TimelogicService)
  api = inject(ApiService)
  helper = inject(HelpersService)
  router = inject(Router)
  modalRef?: BsModalRef;
  modalService = inject(BsModalService);


  // End Dependency Injection 

  constructor() { }

  // Datas Variables
  LocalCitiesData: any = [];
  onewayCitiesData: any = [];
  onewayReturnCitiesData: any = [];
  roundCitiesData: any = [];
  multiCitiesData: any = [];
  airportCitiesData: any = [];

  citiesData: any = [];
  timesData: any = [];

  // Variables
  filteredCities: Observable<any[]> | undefined;

  localPickupCities: Observable<any[]> | undefined;
  oneWayPickupCities: Observable<any[]> | undefined;
  oneWayDropCities: Observable<any[]> | undefined;
  RoundTripPickupCities: Observable<any[]> | undefined;
  RoundTripDropCities: Observable<any[]> | undefined;
  multiCityTripCities: Observable<any[]> | undefined;


  localRentalForm: FormGroup;
  onewayForm: FormGroup;
  roundtripForm: FormGroup;
  multicityForm: FormGroup;
  airportForm: FormGroup;
  multipleCityForm: FormGroup;

  ngOnInit() {
    const local = new FormData(); local.append("tour_type_id", "0");
    const oneway = new FormData(); oneway.append("tour_type_id", "1");
    const round = new FormData(); round.append("tour_type_id", "2");
    // const multi = new FormData(); multi.append("tour_type_id", "2");
    const airport = new FormData(); airport.append("tour_type_id", "4");

    this.api.getCityForSearch(local).subscribe((res: any) => { this.LocalCitiesData = res.data; })
    this.api.getCityForSearch(oneway).subscribe((res: any) => { this.onewayCitiesData = res.data; })
    this.api.getCityForSearch(round).subscribe((res: any) => { this.roundCitiesData = res.data; this.multiCitiesData = res.data; console.log(res.data) })
    // this.api.getCityForSearch(multi).subscribe((res: any) => { this.multiCitiesData = res.data; })
    this.api.getCityForSearch(airport).subscribe((res: any) => { this.airportCitiesData = res.data; this.afterApiHits() })


    this.localRentalForm = this.formBuilder.group({
      pickupCity: ['', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required]
    });
    this.onewayForm = this.formBuilder.group({
      pickupCity: ['', Validators.required],
      dropCity: ['', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
    })
    this.roundtripForm = this.formBuilder.group({
      pickupCity: ['', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      returnCity: ['', Validators.required],
      returnDate: ['', Validators.required]
    })
    this.multicityForm = this.formBuilder.group({
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      returnDate: ['', Validators.required]
    });

    this.airportForm = this.formBuilder.group({
      trip_type: ['0', Validators.required],
      pickup_airport: ['', Validators.required],
      drop_location: ['', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
    });
    this.multipleCityForm = this.formBuilder.group({
      pickupCity: ['', Validators.required],
      toCity: ['', Validators.required]
    })

  }
  getOnewayDropcities() {
    const da = new FormData()
    da.append("pickup_city", this.onewayForm.value.pickupCity);
    this.api.getOneWayDropDownCity(da).subscribe((res: any) => {
      this.onewayReturnCitiesData = res.data;
      this.afterApiHits()
    })
  }
  afterApiHits() {
    this.localPickupCities = this.localRentalForm.get('pickupCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLocalCity(value || ''))
    );
    this.oneWayPickupCities = this.onewayForm.get('pickupCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOnewayCity(value || ''))
    );
    this.oneWayDropCities = this.onewayForm.get('dropCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOnewayDropCity(value || ''))
    );
    this.RoundTripPickupCities = this.roundtripForm.get('pickupCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRoundCity(value || ''))
    );
    // this.RoundTripDropCities = this.roundtripForm.get('returnCity')!.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterAirportCity(value || ''))
    // );
    this.multiCityTripCities = this.multipleCityForm.get('pickupCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMultiCity(value || ''))
    );
  }

  // Filter Functions
  private _filterLocalCity(value: any) {
    const filterValue = value.toLowerCase();
    return this.LocalCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  }
  private _filterOnewayCity(value: any) {
    const filterValue = value.toLowerCase();
    return this.onewayCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  }
  private _filterOnewayDropCity(value: any) {
    const filterValue = value.toLowerCase();
    return this.onewayReturnCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  }
  private _filterRoundCity(value: any) {
    const filterValue = value.toLowerCase();
    return this.roundCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  }
  private _filterMultiCity(value: any) {
    const filterValue = value.toLowerCase();
    return this.multiCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  }
  private _filterAirportCity(value: any) {
    const filterValue = value.toLowerCase();
    return this.airportCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  }
  // End Filter Functions


  getTime(formName: any) {
    if (formName == "local_rental") {
      let data = {
        formName: formName,
        pickupDate: this.localRentalForm.value.pickupDate.toLocaleDateString()
      }
      this.timesData = this.timeLogic.generateTimes(data)
    }
    if (formName == "one_way") {
      let data = {
        formName: formName,
        pickupDate: this.onewayForm.value.pickupDate.toLocaleDateString()
      }
      this.timesData = this.timeLogic.generateTimes(data)
    }
    if (formName == "round_trip") {
      let data = {
        formName: formName,
        pickupDate: this.roundtripForm.value.pickupDate.toLocaleDateString()
      }
      this.timesData = this.timeLogic.generateTimes(data)
    }
    if (formName == "multi_city") {
      let data = {
        formName: formName,
        pickupDate: this.multicityForm.value.pickupDate.toLocaleDateString()
      }
      this.timesData = this.timeLogic.generateTimes(data)
    }
    if (formName == "airport") {
      let data = {
        formName: formName,
        pickupDate: this.airportForm.value.pickupDate.toLocaleDateString()
      }
      this.timesData = this.timeLogic.generateTimes(data)
    }

  }


  openFareDetails(modalName: any) {
    this.modalRef = this.modalService.show(modalName, { class: 'modal-lg' });
  }
  // openMultiCityModal(modalName: any){
  //   this.modalRef = this.modalService.show(modalName, { class: 'modal-lg' });
  // }

  //------------------------ Google Places AutoComple ------------------------//
  roundTripReturnCity;
  multicity_toCity;
  multicity_city2;
  multicity_city3;
  multicity_city4;
  multicity_city5;

  callExternalFunction(id: any) {
    CallMaps(id);
  }
  getGooglePlaceForMulticity(id: any, cond:string) {
    if(cond=='city2')
      CallMaps_city2(id);
    if(cond=='city3')
      CallMaps_city3(id);
  }
  getResponse(id: string, toForm: any) {
    if (toForm == 'round_trip') {
      setTimeout(() => {
        this.roundTripReturnCity = MapsReturn(id)
        console.log(this.roundTripReturnCity)
        this.roundtripForm.controls['returnCity'].setValue(this.roundTripReturnCity.formatted_address)
      }, 500)
    }
    if (toForm == 'multi_city_tocity') {
      setTimeout(() => {
        this.multicity_toCity = MapsReturn(id)
        console.log(this.multicity_toCity)
        this.multipleCityForm.controls['toCity'].setValue(this.multicity_toCity.formatted_address)
      }, 500)
    }
    if (toForm == 'city2') {
      setTimeout(() => {
        this.multicity_city2 = multicity_city2(id)
        console.log(this.multicity_city2)
        this.multipleCityForm.controls['city2'].setValue(this.multicity_city2.formatted_address)
      }, 500)
    }
    if (toForm == 'city3') {
      setTimeout(() => {
        this.multicity_city3 = multicity_city3(id)
        console.log(this.multicity_city3)
        this.multipleCityForm.controls['city3'].setValue(this.multicity_city3.formatted_address)
      }, 500)
    }
    if (toForm == 'city4') {
      setTimeout(() => {
        this.multicity_city4 = multicity_city4(id)
        console.log(this.multicity_city4)
        this.multipleCityForm.controls['city4'].setValue(this.multicity_city4.formatted_address)
      }, 500)
    }
    if (toForm == 'city5') {
      setTimeout(() => {
        this.multicity_city5 = multicity_city5(id)
        console.log(this.multicity_city5)
        this.multipleCityForm.controls['city5'].setValue(this.multicity_city5.formatted_address)
      }, 500)
    }
  }
  //------------------------ Google Places AutoComple ------------------------//




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
      name2: "Vehicles"
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


  private formatDate(datestring: any) {

    const yyyy = datestring.getFullYear();
    let mm = datestring.getMonth() + 1; // Months start at 0!
    let dd = datestring.getDate() + 1;

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
  }


  // ------------------ Selected City Logic ------------------ //
  selected_local_pickupCity: string;
  selected_oneway_pickupCity: string;
  selected_oneway_dropCity: string;
  selected_round_pickupCity: string;
  selected_round_dropCity: string;
  selected_multi_pickCity: string;

  select_city_by_click(evt: any, name: string) {
    if (name == 'local') {
      this.selected_local_pickupCity = evt.city;
      this.localRentalForm.controls['pickupCity'].setValue(evt.city)
    }
    if (name == 'oneway_pickup') {
      this.selected_oneway_pickupCity = evt.city;
      this.onewayForm.controls['pickupCity'].setValue(evt.city)
    }
    if (name == 'oneway_drop') {
      this.selected_oneway_dropCity = evt.city;
      this.onewayForm.controls['dropCity'].setValue(evt.city)
    }
    if (name == 'round_pickup') {
      this.selected_round_pickupCity = evt.city;
      this.roundtripForm.controls['pickupCity'].setValue(evt.city)
    }
    if (name == 'round_return') {
      this.selected_round_dropCity = evt.city;
      this.roundtripForm.controls['returnCity'].setValue(evt.city)
    }
    if (name == 'multi_city') {
      this.selected_multi_pickCity = evt.city;
      this.multipleCityForm.controls['pickupCity'].setValue(evt.city)
    }
  }
  validate_selected_city(evt, name: string) {
    if (name == 'local') {
      setTimeout(() => {
        if (this.selected_local_pickupCity != evt.target.value) {
          this.localRentalForm.controls['pickupCity'].setValue("")
        }
      }, 200)
    }
    if (name == "oneway_pickup") {
      setTimeout(() => {
        if (this.selected_oneway_pickupCity != evt.target.value) {
          this.onewayForm.controls['pickupCity'].setValue("")
        }
      }, 200)
    }
    if (name == "oneway_drop") {
      setTimeout(() => {
        if (this.selected_oneway_dropCity != evt.target.value) {
          this.onewayForm.controls['dropCity'].setValue("")
        }
      }, 200)
    }
    if (name == "round_pickup") {
      setTimeout(() => {
        if (this.selected_round_pickupCity != evt.target.value) {
          this.roundtripForm.controls['pickupCity'].setValue("")
        }
      }, 200)
    }
    if (name == "round_return") {
      setTimeout(() => {
        if (this.selected_round_dropCity != evt.target.value) {
          this.roundtripForm.controls['returnCity'].setValue("")
        }
      }, 200)
    }
    if (name == "multi_city") {
      setTimeout(() => {
        if (this.selected_multi_pickCity != evt.target.value) {
          this.multipleCityForm.controls['pickupCity'].setValue("")
        }
      }, 200)
    }
  }
  // ------------------ End Selected City Logic ------------------ //


  // ------------------ Multicity Add One By One City Logic ------------------ //
  addNewInput() {
    if (this.multipleCityForm.contains('toCity') && !this.multipleCityForm.contains('city2') && this.multipleCityForm.value.toCity!='') {
      this.multipleCityForm.addControl('city2', this.formBuilder.control('', Validators.required));
    } else if (this.multipleCityForm.contains('city2') && !this.multipleCityForm.contains('city3')) {
      this.multipleCityForm.addControl('city3', this.formBuilder.control('', Validators.required));
    } else if (this.multipleCityForm.contains('city3') && !this.multipleCityForm.contains('city4')) {
      this.multipleCityForm.addControl('city4', this.formBuilder.control('', Validators.required));
    } else if (this.multipleCityForm.contains('city4') && !this.multipleCityForm.contains('city5')) {
      this.multipleCityForm.addControl('city5', this.formBuilder.control('', Validators.required));
    } else {
      console.log("All city controls are already added.");
    }
  }
  removeInput(da:string) {
    if (da=='city2') {
      this.multipleCityForm.removeControl('city2');
    } else if (da=='city3') {
      this.multipleCityForm.removeControl('city3');
    } else if (da=='city4') {
      this.multipleCityForm.removeControl('city4');
    } else if (da=='city5') {
      this.multipleCityForm.removeControl('city5');
    } else {
      console.log("All Removed.");
    }
  }
  // ------------------ Multicity Add One By One City Logic ------------------ //



  // ------------------ Submit Forms ------------------ //
  submitLocalRent() {
    if (this.localRentalForm.valid) {
      const data = new FormData();
      data.append("pickupCity", this.localRentalForm.value.pickupCity);
      data.append("pickupDate", moment(this.localRentalForm.value.pickupDate).format("YYYY-MM-DD"));
      data.append("pickupTime", this.localRentalForm.value.pickupTime);
      data.append("type_of_tour", "0")

      let obj: { [key: string]: any } = {};
      data.forEach((val, index) => {
        obj[index] = val;  // Use the index as the key
      });

      localStorage.setItem("SearchForm", JSON.stringify(obj));
      this.router.navigate(['/search-result'])

      // this.api.searchTaxiRoutes(data).subscribe((res: any) => {
      //   if (res.success == "true")
      //     this.helper.autoHideSweetAlert("success", "Form Submitted")
      // })
    }
  }
  submitOneWay() {
    if (this.onewayForm.valid) {
      const data = new FormData();
      data.append("pickupCity", this.onewayForm.value.pickupCity);
      data.append("dropCity", this.onewayForm.value.dropCity);
      data.append("pickupDate", moment(this.onewayForm.value.pickupDate).format("YYYY-MM-DD"));
      data.append("pickupTime", this.onewayForm.value.pickupTime);
      data.append("pickDay", "Monday");
      data.append("type_of_tour", "1")

      let obj: { [key: string]: any } = {};
      data.forEach((val, index) => {
        obj[index] = val;  // Use the index as the key
      });

      localStorage.setItem("SearchForm", JSON.stringify(obj));
      this.router.navigate(['/search-result'])
    }
  }
  submitRoundTrip() {
    if (this.roundtripForm.valid) {
      const data = new FormData();
      data.append("pickupCity", this.roundtripForm.value.pickupCity);
      data.append("pickupDate", moment(this.roundtripForm.value.pickupDate).format("YYYY-MM-DD"));
      data.append("pickupTime", this.roundtripForm.value.pickupTime);
      data.append("returnCity", this.roundtripForm.value.returnCity);
      data.append("returnDate", moment(this.roundtripForm.value.returnDate).format("YYYY-MM-DD"));
      data.append("type_of_tour", "2")

      let obj: { [key: string]: any } = {};
      data.forEach((val, index) => {
        obj[index] = val;  // Use the index as the key
      });

      localStorage.setItem("SearchForm", JSON.stringify(obj));
      this.router.navigate(['/search-result'])
    }
    // console.log(this.roundtripForm.value)
  }
  submitMultiCity(modal: any) {
    if (this.multicityForm.valid) {
      const data = new FormData();
      data.append("pickupDate", moment(this.multicityForm.value.pickupDate).format("YYYY-MM-DD"));
      data.append("pickupTime", this.multicityForm.value.pickupTime);
      data.append("returnDate", moment(this.multicityForm.value.returnDate).format("YYYY-MM-DD"));
      data.append("type_of_tour", "3")

      let obj: { [key: string]: any } = {};
      data.forEach((val, index) => {
        obj[index] = val;  // Use the index as the key
      });

      this.openFareDetails(modal)

      // localStorage.setItem("SearchForm", JSON.stringify(obj));
      // this.router.navigate(['/search-result'])
    }
    // console.log(this.multicityForm.value)
  }
  submitMultiCityForm() {
    console.log(this.multicityForm.value)
    console.log(this.multipleCityForm.value)
  }
  submitAirport() {
    const obj = {
      "drop_location": this.airportForm.value.drop_location,
      "pickupDate": this.airportForm.value.pickupDate,
    }
    console.log(this.airportForm.value)
  }



  // Make LIFO In multicity UI. Remove last input first and first in last

}

