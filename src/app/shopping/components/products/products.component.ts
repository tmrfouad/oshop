import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { TranslateService } from 'ng2-translate';

import { Product } from '../../../shared/models/product';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

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
  loading = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    public translate: TranslateService,
    private router: Router) { }

  async ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.toString().startsWith('NavigationStart'))
        this.loading = true;
      if (event.toString().startsWith('NavigationEnd'))
        this.loading = false;
    })
    this.loading = true;
    this.cart$ = await this.cartService.get();
    this.pupulateProducts();
  }

  private pupulateProducts() {
    this.productService.getAll().switchMap(products => {
      this.filteredProducts = this.products = products;
      return this.route.queryParamMap;
    }).subscribe(params => {
        this.category = params.get('category');
        this.FilterProducts('');
        this.loading = false;
    });
  }

  FilterProducts(filter: string) {
    this.filteredProducts =
    this.category ?
    this.products.filter(p => {
      return p.category === this.category && p.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    }) :
    this.products.filter(p => {
      return p.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    });
  }
}
