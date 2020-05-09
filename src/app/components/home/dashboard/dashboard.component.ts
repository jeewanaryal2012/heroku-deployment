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
  constructor(private userProfileService: UserProfileService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    const currentUser = this.authenticationService.currentUserValue.email;

    this.userProfileService.getAllUserProfile(currentUser).subscribe(res => {
      console.log(res);
      this.users = res.message[0].list;
    }, err => { });
  }

  sendFriendRequest(e, u) {
    console.log(u);
  }

}
