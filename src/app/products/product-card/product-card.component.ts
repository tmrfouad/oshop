import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean;

  constructor() { }

  ngOnInit() {
  }

}
