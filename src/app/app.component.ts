import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { TranslateService, DefaultLangChangeEvent, TranslationChangeEvent, LangChangeEvent } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  theme = 'green-theme';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.toString().startsWith('NavigationStart')) {
        this.loading = true;
      }
      if (event.toString().startsWith('NavigationEnd')) {
        this.loading = false;
      }
    })
    
    const theme = localStorage.getItem('theme');
    if (theme) this.theme = theme;

    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const currentLang = localStorage.getItem('lang');
    if (currentLang) {
      this.translate.use(currentLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem('lang', event.lang);
      if (event.lang === 'ar') {
        // do something
      }
    });

    this.translate.onTranslationChange.subscribe((event: TranslationChangeEvent) => {
      if (event.lang === 'ar') {
        // do something
      }
    });

    this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
      if (event.lang === 'ar') {
        // do something
      }
    });

    this.auth.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        localStorage.removeItem('returnUrl');
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        }
      }
    });
  }

  onThemeChange(theme) {
      this.theme = theme;
  }
}
