import { OrderItem } from 'shared/models/order-item';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items$: Observable<OrderItem[]>;
  items: OrderItem[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    // this.items$ = this.orderService.getFeaturedProducts();
    // this.items$.subscribe(items => {
    //   console.log(items);
    //   this.items = items;
    // });
  }

}
