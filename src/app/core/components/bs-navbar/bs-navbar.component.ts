import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  @Output('themeChange') themeChange = new EventEmitter<string>();

  currentUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    public translate: TranslateService
  ) { }

  async ngOnInit() {
    this.auth.currentUser$
      .subscribe(appUser => this.currentUser = appUser);
    this.cart$ = await this.cartService.get();
  }

  logout() {
    this.auth.logout();
  }

  setTheme(theme: string) {
    this.themeChange.emit(theme);
  }
}
