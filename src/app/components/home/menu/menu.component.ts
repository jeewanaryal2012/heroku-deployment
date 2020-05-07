import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { BaseService } from '../../../_services/base.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() user: any;
  // user: IUser = {
  //   firstName: '',
  //   lastName: '',
  //   userName: '',
  //   email: ''
  // };
  loggingOut = false;
  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService
    , private baseService: BaseService) { }

  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue);
    //this.user.userName = this.authenticationService.currentUserValue.userName;
  }

  ngOnChanges() {
    console.log(this.user);
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
      location.reload();
    }, 2000);
  }

  test() {
    this.baseService.get('test').subscribe(res => {
      console.log(res);
    }, err => { });
  }

  beMember(e) {

  }
}

export interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
}
