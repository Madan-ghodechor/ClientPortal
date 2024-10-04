import { Component, inject, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HelpersService } from '../../services/helpers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimelogicService } from '../../services/timelogic.service';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import moment from 'moment';


declare const CallMaps: any;
declare const MapsReturn: any;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {


  
  //------------------------ Dependency's And Services ------------------------//
  modalRef?: BsModalRef;
  modalService = inject(BsModalService);
  helper = inject(HelpersService);
  fb = inject(FormBuilder);
  timeLogic = inject(TimelogicService);
  api = inject(ApiService)
  router = inject(Router)


  //------------------------ Static Data's And Variables ------------------------//
  cabs = []
  cabsFullData: any = [];
  formData: any;
  timesData: any;

  citiesData: any;
  LocalCitiesData: any = [];
  onewayCitiesData: any = [];
  onewayReturnCitiesData: any = [];
  roundCitiesData: any = [];
  multiCitiesData: any = [];
  airportCitiesData: any = [];

  TodaysDate: Date = new Date();



  //------------------------ Google Places AutoComple ------------------------//
  roundTripReturnCity
  callExternalFunction(da: any) {
    CallMaps(da);
  }
  getResponse(id: string) {
    setTimeout(() => {
      this.roundTripReturnCity = MapsReturn(id)
      console.log(this.roundTripReturnCity)
      this.modifyRoundForm.controls['returnCity'].setValue(this.roundTripReturnCity.formatted_address)
    }, 500)
  }
  //------------------------ Google Places AutoComple ------------------------//



  //------------------------ Forms Declarations ------------------------//
  modifyLocalRentalForm: FormGroup;
  modifyOnewayForm: FormGroup;
  modifyRoundForm: FormGroup;


  //------------------------ Default Method's ------------------------//
  constructor() { }
  ngOnInit() {

    // get Cities Starts
    const local = new FormData(); local.append("tour_type_id", "0");
    const oneway = new FormData(); oneway.append("tour_type_id", "1");
    const round = new FormData(); round.append("tour_type_id", "2");
    // const multi = new FormData(); multi.append("tour_type_id", "3");
    const airport = new FormData(); airport.append("tour_type_id", "4");

    this.api.getCityForSearch(local).subscribe((res: any) => { this.LocalCitiesData = res.data; })
    this.api.getCityForSearch(oneway).subscribe((res: any) => { this.onewayCitiesData = res.data; })
    this.api.getCityForSearch(round).subscribe((res: any) => { this.roundCitiesData = res.data; this.multiCitiesData = res.data; })
    // this.api.getCityForSearch(multi).subscribe((res: any) => { this.multiCitiesData = res.data; })
    this.api.getCityForSearch(airport).subscribe((res: any) => { this.airportCitiesData = res.data; this.afterApiHits() })
    // get Cities Ends

    this.formData = JSON.parse(localStorage.getItem("SearchForm"));
    this.modifyLocalRentalForm = this.fb.group({
      pickupCity: ['', [Validators.required]],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      tourType: [''],
    })
    this.modifyOnewayForm = this.fb.group({
      pickupCity: ['', [Validators.required]],
      dropCity: ['', [Validators.required]],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      pickupDay: ['', Validators.required],
      tourType: [''],
    })
    this.modifyRoundForm = this.fb.group({
      pickupCity: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      returnCity: ['', [Validators.required]],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      tourType: [''],
    })
    this.setFormData();
    this.getSearchTaxis()
  }
  getOnewayDropcities() {
    const da = new FormData()
    da.append("pickup_city", this.modifyOnewayForm.value.pickupCity);
    this.api.getOneWayDropDownCity(da).subscribe((res: any) => {
      this.onewayReturnCitiesData = res.data;
      this.afterApiHits()
    })
  }
  getSearchTaxis() {
    if (this.formData.type_of_tour == 0) {
      const data = new FormData();
      data.append("pickup_city", this.modifyLocalRentalForm.value.pickupCity);
      data.append("pickup_date", this.modifyLocalRentalForm.value.pickupDate);
      data.append("pickup_time", this.modifyLocalRentalForm.value.pickupTime);
      data.append("type_of_tour", this.modifyLocalRentalForm.value.tourType);

      this.api.getTaxis(data).subscribe((res: any) => {
        console.log(res.data)
        localStorage.setItem('search_id',res.data.search_id)
        this.cabs = res.data.taxis
        this.cabsFullData = res.data;
      })
    }
    if (this.formData.type_of_tour == 1) {
      const data = new FormData();
      data.append("pickup_city", this.modifyOnewayForm.value.pickupCity);
      data.append("drop_city", this.modifyOnewayForm.value.dropCity);
      data.append("pickup_date", this.modifyOnewayForm.value.pickupDate);
      data.append("pickup_time", this.modifyOnewayForm.value.pickupTime);
      data.append("pickup_day", this.modifyOnewayForm.value.pickDay);
      data.append("type_of_tour", this.modifyOnewayForm.value.tourType);

      this.api.getTaxisOneWay(data).subscribe((res: any) => {
        console.log(res)
        this.cabs = res.data.taxis;
        this.cabsFullData = res.data;
      })
    }
    if (this.formData.type_of_tour == 2) {
      console.log(this.formData)
      const data = new FormData();
      data.append("pickup_city", this.modifyRoundForm.value.pickupCity);
      data.append("cities", this.helper.convertCitiesHyfan(this.modifyRoundForm.value.returnCity));
      data.append("pickup_date", this.modifyRoundForm.value.pickupDate);
      data.append("pickup_time", this.modifyRoundForm.value.pickupTime);
      data.append("return_date", this.modifyRoundForm.value.returnDate);
      data.append("type_of_tour", this.modifyRoundForm.value.tourType);

      // data.forEach((val, key) => {
      //   console.log(key + ":" + val)
      // })

      this.api.getTaxis(data).subscribe((res: any) => {
        console.log(res)
        this.cabs = res.data.taxis;
        this.cabsFullData = res.data;
      })
    }

  }

  //------------------------ Fare Details Modal ------------------------//
  FareDetails: any;
  openFareDetails(modalName: any, data: any) {
    this.FareDetails = data;
    console.log(data)
    this.modalRef = this.modalService.show(modalName, { class: 'modal-lg' });
  }

  //------------------------ Modify Search Form Logic ------------------------//
  modifySearchModal(modalName){
    this.setFormData()
    this.modalRef = this.modalService.show(modalName, { class: 'modal-lg' });
  }

  //------------------------ Modify Search Form Logic ------------------------//
  setFormData() {
    if (this.formData.type_of_tour == 0) {
      this.modifyLocalRentalForm.setValue({
        pickupCity: this.formData.pickupCity,
        pickupDate: this.formData.pickupDate,
        pickupTime: this.formData.pickupTime,
        tourType: this.formData.type_of_tour
      });
    }

    if (this.formData.type_of_tour == 1) {
      this.modifyOnewayForm.setValue({
        pickupCity: this.formData.pickupCity,
        dropCity: this.formData.dropCity,
        pickupDate: this.formData.pickupDate,
        pickupTime: this.formData.pickupTime,
        pickupDay: this.formData.pickDay,
        tourType: this.formData.type_of_tour,
      })
    }

    if (this.formData.type_of_tour == 2) {
      this.modifyRoundForm.setValue({
        pickupCity: this.formData.pickupCity,
        returnCity: this.formData.returnCity,
        pickupDate: this.formData.pickupDate,
        pickupTime: this.formData.pickupTime,
        tourType: this.formData.type_of_tour,
        returnDate: this.formData.returnDate
      })
    }

    const data = {
      formName: "local_rental",
      pickupDate: this.timeLogic.convertDateString(this.formData.pickupDate)
    }
    this.timesData = this.timeLogic.generateTimes(data)
  }

  modifyCities: Observable<any[]> | undefined;

  localPickupCities: Observable<any[]> | undefined;
  oneWayPickupCities: Observable<any[]> | undefined;
  oneWayDropCities: Observable<any[]> | undefined;
  RoundTripPickupCities: Observable<any[]> | undefined;
  RoundTripDropCities: Observable<any[]> | undefined;


  // ------------------ Selected City Logic ------------------ //
  selected_local_pickupCity: string;
  selected_oneway_pickupCity: string;
  selected_oneway_dropCity: string;
  selected_round_pickupCity: string;
  selected_round_dropCity: string;

  select_city_by_click(evt: any, name: string) {
    if (name == 'local') {
      this.selected_local_pickupCity = evt.city;
      this.modifyLocalRentalForm.controls['pickupCity'].setValue(evt.city)
    }
    if (name == 'oneway_pickup') {
      this.selected_oneway_pickupCity = evt.city;
      this.modifyOnewayForm.controls['pickupCity'].setValue(evt.city)
    }
    if (name == 'oneway_drop') {
      this.selected_oneway_dropCity = evt.city;
      this.modifyOnewayForm.controls['dropCity'].setValue(evt.city)
    }
    // if (name == 'round_pickup') {
    //   this.selected_round_pickupCity = evt.city;
    //   this.roundtripForm.controls['pickupCity'].setValue(evt.city)
    // }
    // if (name == 'round_return') {
    //   this.selected_round_dropCity = evt.city;
    //   this.roundtripForm.controls['returnCity'].setValue(evt.city)
    // }
  }
  validate_selected_city(evt, name: string) {
    if (name == 'local') {
      setTimeout(() => {
        if (this.selected_local_pickupCity != evt.target.value) {
          this.modifyLocalRentalForm.controls['pickupCity'].setValue("")
        }
      }, 200)
    }
    if (name == "oneway_pickup") {
      setTimeout(() => {
        if (this.selected_oneway_pickupCity != evt.target.value) {
          this.modifyOnewayForm.controls['pickupCity'].setValue("")
        }
      }, 200)
    }
    if (name == "oneway_drop") {
      setTimeout(() => {
        if (this.selected_oneway_dropCity != evt.target.value) {
          this.modifyOnewayForm.controls['dropCity'].setValue("")
        }
      }, 200)
    }
    //   if (name == "round_pickup") {
    //     setTimeout(() => {
    //       if (this.selected_round_pickupCity != evt.target.value) {
    //         this.roundtripForm.controls['pickupCity'].setValue("")
    //       }
    //     }, 200)
    //   }
    //   if (name == "round_return") {
    //     setTimeout(() => {
    //       if (this.selected_round_dropCity != evt.target.value) {
    //         this.roundtripForm.controls['returnCity'].setValue("")
    //       }
    //     }, 200)
    //   }
  }
  // ------------------ End Selected City Logic ------------------ //


  isCollapsed = true;

  getTime(formName: any) {
    if (formName == "local_rental") {
      let data = {
        formName: formName,
        pickupDate: this.modifyLocalRentalForm.value.pickupDate.toLocaleDateString()
      }
      this.timesData = this.timeLogic.generateTimes(data)
    }
  }


  afterApiHits() {
    this.localPickupCities = this.modifyLocalRentalForm.get('pickupCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLocalCity(value || ''))
    );
    this.oneWayPickupCities = this.modifyOnewayForm.get('pickupCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOnewayCity(value || ''))
    );
    this.oneWayDropCities = this.modifyOnewayForm.get('dropCity')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOnewayDropCity(value || ''))
    );
    // this.RoundTripPickupCities = this.roundtripForm.get('pickupCity')!.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterRoundCity(value || ''))
    // );
    // this.RoundTripDropCities = this.roundtripForm.get('returnCity')!.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterAirportCity(value || ''))
    // );
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
  // private _filterRoundCity(value: any) {
  //   const filterValue = value.toLowerCase();
  //   return this.roundCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  // }
  // private _filterMultiCity(value: any) {
  //   const filterValue = value.toLowerCase();
  //   return this.multiCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  // }
  // private _filterAirportCity(value: any) {
  //   const filterValue = value.toLowerCase();
  //   return this.airportCitiesData.filter((option: any) => option.city.toLowerCase().includes(filterValue));
  // }
  // End Filter Functions










  SubmitLocalRentalForm(){
    console.log(this.modifyLocalRentalForm.value)
    let obj = {
      pickupCity : this.modifyLocalRentalForm.value.pickupCity,
      pickupDate : moment(this.modifyLocalRentalForm.value.pickupDate).format("YYYY-MM-DD"),
      pickupTime :  this.modifyLocalRentalForm.value.pickupTime,
      type_of_tour : "0"
    }
    localStorage.setItem("SearchForm", JSON.stringify(obj))
    this.modalRef.hide()
    this.ngOnInit()
     
  }
  SubmiOnewayRentalForm(){
    
  }



























  // ------------------ Select Cab ------------------ //
  setCabDetails(cab){
    localStorage.setItem('selectedCabDetails', JSON.stringify(cab))
    this.router.navigate(['/booking-payment'])
  }


}
