import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../_services/base.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
  }

  test() {
    this.baseService.get('test').subscribe(res => {
      console.log(res);
    }, err => { });
  }

}
