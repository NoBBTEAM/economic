import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industry-board',
  templateUrl: './industry-board.component.html',
  styleUrls: ['./industry-board.component.css']
})
export class IndustryBoardComponent implements OnInit {
  isShowIndustryMenu: boolean = true;
  isShowParkMenu: boolean = false;
  isShowLandMenu: boolean = false;
  isShowFloorMenu: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  showIndustryMenus(flag) {
    switch (flag) {
      case 'IndustryMenu':
        this.isShowParkMenu = false;
        this.isShowLandMenu = false;
        this.isShowFloorMenu = false;
        this.isShowIndustryMenu = true;
        break;
      case 'ParkMenu':
        this.isShowLandMenu = false;
        this.isShowIndustryMenu = false;
        this.isShowFloorMenu = false;
        this.isShowParkMenu = true;
        break;
      case 'LandMenu':
        this.isShowIndustryMenu = false;
        this.isShowParkMenu = false;
        this.isShowFloorMenu = false;
        this.isShowLandMenu = true;
        break;
      case 'FloorMenu':
        this.isShowIndustryMenu = false;
        this.isShowParkMenu = false;
        this.isShowLandMenu = false;
        this.isShowFloorMenu = true;
        break;
    }
  }

}
