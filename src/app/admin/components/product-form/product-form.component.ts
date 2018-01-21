import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from '../../../shared/models/product';
import { Category } from '../../../shared/models/category';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: FirebaseListObservable<Category[]>;
  product: Product = {};
  productId: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.get(this.productId)
        .take(1).subscribe(product => this.product = product);
    }
  }

  save(product) {
    if (this.productId) {
      this.productService.update(this.productId, this.product)
        .then(() => this.router.navigate(['/admin/products']));
    } else {
      this.productService.create(product)
        .then(() => this.router.navigate(['/admin/products']));
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) { return; }

    if (!this.productId) { return; }

    this.productService.delete(this.productId)
      .then(() => this.router.navigate(['/admin/products']));
  }
}
