import { OrderItem } from './../models/order-item';
import { Product } from './../models/product';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from '../models/order';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) { }

  getAll(): FirebaseListObservable<Order[]> {
    return this.db.list('/orders');
  }

  private getProducts() {
    return this.db.list('/orders', {query: {orderByKey: true}}).map((orders: Order[]) => {
      return orders.map(order => {
        return this.db.list(`/orders/${order.$key}/items`);
      });
    });
  }

  getFeaturedProducts() {
    return null;
  }

  getByUser(userId: string): FirebaseListObservable<Order[]> {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  get(orderId: string): FirebaseObjectObservable<Order> {
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
