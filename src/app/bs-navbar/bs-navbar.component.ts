import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  currentUser: AppUser;
  constructor(public auth: AuthService) {
    auth.currentUser$.subscribe(appUser => {
      this.currentUser = appUser;
      console.log(appUser);
    });
  }

  logout() {
    this.auth.logout();
  }
}
