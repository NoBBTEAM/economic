import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-function-manage',
  templateUrl: './function-manage.component.html',
  styleUrls: ['./function-manage.component.css']
})
export class FunctionManageComponent implements OnInit {
  functionName: string;
  functionMethod: string = 'POST';
  functionDesc: string;
  methods = ['POST', 'GET', 'DELETE', 'PATCH'];
  constructor() { }

  ngOnInit() {
  }

}
