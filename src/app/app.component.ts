import { Component, OnInit } from '@angular/core';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  constructor(private _US: UserService) { }

  ngOnInit(): void {
    const allReadyLoggedIn = JSON.parse(localStorage.getItem("currentUser")!);
    if (allReadyLoggedIn && allReadyLoggedIn.token) {
      this._US.updateUserAuth(true, allReadyLoggedIn);
    }
  }

}
