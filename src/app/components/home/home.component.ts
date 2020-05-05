import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue);
    this.user = this.authenticationService.currentUserValue;
  }

}
