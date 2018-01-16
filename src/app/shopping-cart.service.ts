import { ShoppingCartItem } from './models/shopping-cart-item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private async create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async get() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(c => new ShoppingCart(c.items)) as FirebaseObjectObservable<ShoppingCart>;
  }

  private async getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const result = await this.create();
      cartId = result.key;
      localStorage.setItem('cartId', cartId);
    }

    return cartId;
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = await this.getItem(cartId, product.$key);
    item$.take(1)
      .subscribe(item => item$.update({ product: product, quantity: (item.quantity || 0) + change }));
  }

  async getQuantity(product: Product) {
    const cart = await this.get();
    return cart.map((c: ShoppingCart) => {
      if (!c || !(c.items) || !(c.items[product.$key])) return 0;
      return (c.items[product.$key] as ShoppingCartItem).quantity;
    });
  }
}
