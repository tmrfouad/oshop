import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../../shared/models/order';
import { FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders$: FirebaseListObservable<Order[]>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.orders$ = this.authService.user$
      .switchMap((user: firebase.User) => this.orderService.getByUser(user.uid)) as FirebaseListObservable<Order[]>;
  }

  ngOnDestroy() {
  }

}
