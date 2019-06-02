import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authSubscription: Subscription;
  currentYear = new Date().getFullYear();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // get current user data
    this.initUserData();
  }

  /**
   * subscribes to Auth Service
   * and anonymously registers the user if it's not yet registered
   */
  initUserData() {
    this.authSubscription = this.authService.data.subscribe(data => {
      // if data is null, the user is not logged in
      // loging as anonimous user for now
      if (data === null) {
        this.authService.anonimousLogin();
      }
    });
  }
}
