import { Component, OnInit, Input } from '@angular/core';

interface PageParam {
  totalPage: number;
  currentPage: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  totalPage: number;
  currentPage: number;
  constructor() { }

  @Input() set pageParam(pageParam: PageParam) {
    // this._pageParam = value;
    console.log(pageParam);
    if (pageParam) {
      this.totalPage = pageParam.totalPage ? pageParam.totalPage : 0;
      this.currentPage = (pageParam.currentPage ? pageParam.currentPage : 0) + 1;
    }
    // do something on 'aa' change
  }

  ngOnInit() {
  }

}
