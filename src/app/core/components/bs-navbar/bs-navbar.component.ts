import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input('theme-name') themeName: string;
  @Output('themeChange') themeChange = new EventEmitter<string>();

  currentUser: AppUser;
  cart$: Observable<ShoppingCart>;
  theme: { name: string, color: string };
  themes: {[name: string]: {name: string, color: string}};

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    public translate: TranslateService
  ) { }

  async ngOnInit() {
    const greenTheme = { name: 'green-theme', color: '#c1d62e' };
    const purpleTheme = { name: 'purple-theme', color: '#7337ff' };

    this.themes = {
      'green-theme': greenTheme,
      'purple-theme': purpleTheme
    };

    this.theme = this.themes[this.themeName];

    this.auth.currentUser$
      .subscribe(appUser => this.currentUser = appUser);
    this.cart$ = await this.cartService.get();
  }

  logout() {
    this.auth.logout();
  }

  setTheme(theme: { name: string, color: string }) {
    this.theme = theme;
    this.themeChange.emit(theme.name);
    localStorage.setItem('theme', theme.name);
  }
}
