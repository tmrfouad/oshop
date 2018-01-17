import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  currentUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.auth.currentUser$
      .subscribe(appUser => this.currentUser = appUser);
    this.cart$ = await this.cartService.get();
  }

  logout() {
    this.auth.logout();
  }
}
