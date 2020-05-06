import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserProfileService } from '../../_services/user-profile.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private authenticationService: AuthenticationService, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    let email = this.authenticationService.currentUserValue.email;
    this.userProfileService.getUserProfile(email).subscribe(res => {
      this.user = res;
    }, err => { });
  }

}
