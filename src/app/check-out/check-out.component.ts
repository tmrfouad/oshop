import { Component, OnInit } from '@angular/core';
import { Shipping } from '../shared/models/shipping';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shipping: Shipping = {};
  cart$: FirebaseObjectObservable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.get();
  }
}
