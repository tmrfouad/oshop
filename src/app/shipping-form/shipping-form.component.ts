import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { Shipping } from '../models/shipping';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Input('shipping') shipping: Shipping;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async save() {
    const order = new Order(this.shoppingCart, this.shipping, this.userId);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
