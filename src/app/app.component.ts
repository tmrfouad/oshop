import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { TranslateService, DefaultLangChangeEvent, TranslationChangeEvent, LangChangeEvent } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
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
}
