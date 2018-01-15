import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = {};
  productId;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();

    this.productId = route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.product = productService.get(this.productId)
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
