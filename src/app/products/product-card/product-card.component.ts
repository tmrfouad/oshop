import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartItem } from '../../models/shopping-cart-item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  quantity: number;
  quantitySubscription: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.quantitySubscription = (await this.cartService.getQuantity(this.product))
    .subscribe(q => this.quantity = q);
  }

  ngOnDestroy() {
    this.quantitySubscription.unsubscribe();
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart || (!this.shoppingCart['$value'] && !this.shoppingCart.items)) return 0;

    const item: ShoppingCartItem = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }
}
