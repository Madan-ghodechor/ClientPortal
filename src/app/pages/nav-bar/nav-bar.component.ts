import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  hideShow = true;
  SideBar(){
    this.hideShow = !this.hideShow;
    console.log(this.hideShow)
  }
}
