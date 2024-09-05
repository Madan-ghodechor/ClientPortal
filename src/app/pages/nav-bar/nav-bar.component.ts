import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  ngOnInit(): void {
    const userCheck = localStorage.getItem('user_details')
    console.log(userCheck)
    if(userCheck==null){
      let obj = { "user" : null }
      localStorage.setItem("user_details", JSON.stringify(obj) );
    }
  }
  hideShow = true;
  router = inject(Router)
  SideBar(){
    this.hideShow = !this.hideShow;
    console.log(this.hideShow)
  }
  logOut(){
    let obj = { "user" : null }
    localStorage.setItem("user_details", JSON.stringify(obj) );
    this.router.navigate(['/'])
  }
}
