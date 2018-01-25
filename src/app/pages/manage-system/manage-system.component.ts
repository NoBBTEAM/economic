import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-system',
  templateUrl: './manage-system.component.html',
  styleUrls: ['./manage-system.component.css']
})
export class ManageSystemComponent implements OnInit {
  menusControl = {};
  constructor() { }

  ngOnInit() {
  }
  changeMenuShow(name?) {
    for (const i in this.menusControl) {
      this.menusControl[i] = false;
    }
    this.menusControl[name] = true;
  }

}
