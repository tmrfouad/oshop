import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/models/category';
import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/product';
import { TranslateService } from 'ng2-translate';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category: string;
  @Output('filterChange') filterChange = new EventEmitter<string>();

  categories$: Observable<Category[]>;
  filter: string;
  filteredProducts: Product[] = [];
  loading = false;

  constructor(
    private categoryService: CategoryService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.loading = true;
    this.categories$ = this.categoryService.getAll();
  }

  filterProducts() {
    this.filterChange.emit(this.filter);
  }
}
