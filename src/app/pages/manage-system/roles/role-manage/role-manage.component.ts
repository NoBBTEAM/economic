import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit {
  roleName: string;
  roleDesc: string;
  RoleGroupChecked = {gropRole1: false, gropRole2: false};
  RoleGroupType = {'gropRole1': false, 'gropRole2': false};
  allRoleType = {
    'role1': false,
    'role2': false,

  };
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
  changeRoleShow(type: string) {
    if (this.allRoleType[type]) {
      this.allRoleType[type] = !this.allRoleType[type];
    }else {
      this.allRoleType[type] = true;
    }
  }
  changeRoleGrop(type: string) {
    if (this.RoleGroupChecked[type]) {
      this.RoleGroupChecked[type] = !this.RoleGroupChecked[type];
    }else {
      this.RoleGroupChecked[type] = true;
    }
    if (this.RoleGroupChecked[type]) {
      this.RoleGroupType[type] = true;
    }else {
      this.RoleGroupType[type] = false;
    }
    /*if (this.RoleGroupType[type] && this.RoleGroupChecked[type]) {
      this.RoleGroupType[type] = !this.RoleGroupType[type];
    }else {
      this.RoleGroupType[type] = true;
    }*/
  }
  removeRoleGrop(type, event) {
    console.log(event.target.checked)
    if (!event.target.checked) {
      this.RoleGroupChecked[type] = false;
    }
  }
}
