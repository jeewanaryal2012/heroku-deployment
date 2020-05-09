import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../_services/user-profile.service';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any;
  currentUser = this.authenticationService.currentUserValue.email;
  constructor(private userProfileService: UserProfileService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  sendFriendRequest(e, u) {
    const requester = u;
    requester.currentUser = this.authenticationService.currentUserValue.email;
    this.userProfileService.sendFriendRequest(requester).subscribe(res => {
      this.fetchData();
    }, err => { });
  }

  fetchData() {
    this.currentUser = this.authenticationService.currentUserValue.email;
    this.userProfileService.getAllUserProfile(this.currentUser).subscribe(res => {
      console.log(res);
      this.users = res.message[0].list;
    }, err => { });
  }

}
