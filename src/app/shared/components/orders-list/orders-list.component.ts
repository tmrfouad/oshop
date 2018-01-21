import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  @Input('orders') orders: Order[];
  rootUrl: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.rootUrl = this.route.snapshot.url[0].path;
  }

}
