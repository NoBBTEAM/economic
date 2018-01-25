import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit {
  roleName: string;
  roleDesc: string;
  constructor() { }

  ngOnInit() {
  }
}
