import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
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
