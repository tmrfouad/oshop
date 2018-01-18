import { ShoppingCartService } from './shopping-cart.service';
import { Order } from './models/order';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) { }

  getAll() {
    return this.db.list('/orders');
  }

  get(orderId: string) {
    return this.db.object(`/orders/${ orderId }`);
  }

  create(order: Order) {
    return this.db.list('/orders').push(order);
  }

  update(orderId, order: Order) {
    return this.db.object(`/orders/${ orderId }`).update(order);
  }

  delete(orderId) {
    return this.db.object(`/orders/${ orderId }`).remove();
  }

  placeOrder(order: Order) {
    const result = this.create(order);
    this.cartService.clearCart();
    return result;
  }
}
