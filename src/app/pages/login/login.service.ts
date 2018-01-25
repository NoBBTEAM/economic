import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login() {
    // return this.http.post()
  }

}
