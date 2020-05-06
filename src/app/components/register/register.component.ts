import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../_services/authentication.service';
import { RegisterService } from '../../_services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  @ViewChild('input') input: ElementRef;
  userExists = false;
  genderList = [
    { text: 'Male', value: 'm' },
    { text: 'Female', value: 'f' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // this.registerForm.valueChanges.subscribe(res => {
    //   console.log(f);
    // }, err => { });
  }
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(100),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.input.nativeElement.value);
          this.registerService.userExists('user-exists', this.input.nativeElement.value).subscribe(res => {
            console.log(res);
            this.userExists = res['userExists'];
          }, err => { });
        })
      )
      .subscribe();
  }

  get f() { return this.registerForm.controls; }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.f);
    this.registerService.register('register', this.registerForm.value).subscribe(res => {
      console.log(res);
      if (res.registered === true) {
        this.router.navigate(['/login']);
      }
    }, err => { });
  }

}
