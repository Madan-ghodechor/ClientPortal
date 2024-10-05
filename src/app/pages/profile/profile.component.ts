import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData { }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  divs = [
    { id: 1, show: true, name: 'My Account', icon: 'fa fa-user', active: true },
    { id: 2, show: false, name: 'Booking History', icon: 'fa fa-cab', active: false },
    { id: 3, show: false, name: 'Change Password', icon: 'fa fa-unlock-alt', active: false },
    { id: 4, show: false, name: 'Logout', icon: 'fa fa-sign-out', active: false }
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
    { id: 1, show: true, name: 'Upcoming Trips', active: true },
    { id: 2, show: false, name: 'Current Trips', active: false },
    { id: 3, show: false, name: 'Completed Trips', active: false },
    { id: 4, show: false, name: 'Cancelled Trips', active: false },
    { id: 5, show: false, name: 'Pending Trips', active: false },
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


  displayedColumns: string[] = ['booking_id', 'trip_type', 'package', 'booking_date', 'pickup_datetime', 'pickup_location', 'internal_status'];
  dataSource !: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  fb = inject(FormBuilder)

  ProfileForm: FormGroup;

  constructor() { }

  userDetails;

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'))

    this.ProfileForm = this.fb.group({
      name: [this.userDetails ? this.userDetails.user.name : ''],
      city: [this.userDetails ? this.userDetails.user.city_id : ''],
      phone: [this.userDetails ? this.userDetails.user.contact_no : ''],
      email: [this.userDetails ? this.userDetails.user.email : ''],
      dob: [this.userDetails ? this.userDetails.user.dob : ''],
      gender: [this.userDetails ? this.userDetails.user.gender : ''],
    })

  }

  saveProfille() {
    console.log(this.ProfileForm.value)
  }

}
