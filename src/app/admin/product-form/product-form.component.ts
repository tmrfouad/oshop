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

  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.product = productService.get(id)
        .take(1).subscribe(product => this.product = product);
    }
  }

  save(product) {
    this.productService.create(product)
      .then(() => {
        this.router.navigate(['/admin/products']);
      });
  }
}
