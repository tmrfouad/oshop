import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
