import { Component, OnInit } from '@angular/core';
import { LoginService, LoginParams } from './login.service';
import { Router } from '@angular/router';
import { NotyService } from '../../core/noty/noty.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, NotyService]
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  constructor(
    private noty: NotyService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log({username: this.username, password: this.password});
    const params = {
      username: this.username,
      password: this.password
    };
    this.loginService.login(params)
      .subscribe((res: any) => {
        if (res.responseCode === '_200') {
          this.router.navigate(['mic']);
          this.noty.alert({
            text: 'welcome!'
          });
        } else {
          this.noty.alert({
            text: res.errorMsg
          });
        }
      });
  }

}
