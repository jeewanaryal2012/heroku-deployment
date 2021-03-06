import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: IUser = {
    firstName: '',
    lastName: '',
    userName: '',
    email: ''
  };
  loggingOut = false;
  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue);
    this.user.userName = this.authenticationService.currentUserValue.userName;
  }

  userClicked(e) {
    e.preventDefault();
  }

  logout(e) {
    this.loggingOut = true;
    this.authenticationService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.loggingOut = false;
    }, 2000);
  }
}

export interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}
