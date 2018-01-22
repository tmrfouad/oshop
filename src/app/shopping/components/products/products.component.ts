import { FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: FirebaseObjectObservable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.get();
    this.pupulateProducts();
  }

  private pupulateProducts() {
    this.productService.getAll().switchMap(products => {
        this.filteredProducts = this.products = products;
        return this.route.queryParamMap;
    }).subscribe(params => {
        this.category = params.get('category');
        this.FilterProducts();
    });
  }

  private FilterProducts() {
    this.filteredProducts =
    this.category ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }
}
