import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async get() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(c => new ShoppingCart(c.items)) as FirebaseObjectObservable<ShoppingCart>;
  }

  async addToCart(product: Product) {
    this.saveItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.saveItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${ cartId }/items`).remove();
  }

  private async create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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

  private async saveItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = await this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      const quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity
      });
    });
  }
}
