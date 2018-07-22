import { Component, OnInit } from '@angular/core';
import { LoginService, LoginParams } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  constructor(
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
          sessionStorage.setItem('hasLogin', 'YES');
          this.router.navigate(['mic']);
          // this.noty.alert({
          //   text: 'welcome!'
          // });
        } else {
          // this.noty.alert({
          //   text: res.errorMsg
          // });
        }
      });
  }

}
