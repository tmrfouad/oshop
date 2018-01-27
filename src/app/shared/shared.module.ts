import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';

import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { LoadingComponent } from './loading/loading.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    RouterModule.forChild([
      { path: 'my/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
      { path: 'admin/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
    OrdersListComponent,
    LoadingComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
    OrdersListComponent,
    CommonModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule,
    LoadingComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
