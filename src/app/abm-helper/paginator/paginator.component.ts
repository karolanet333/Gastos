import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() rowsPerPage: number = 5;
  @Input() rows : number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() moveNext: EventEmitter<number> = new EventEmitter<number>();
  @Output() movePrevious: EventEmitter<number> = new EventEmitter<number>();
  
  @Input() of_text: string = 'de';
  @Input() page : number = 1;

  constructor() { }

  get pages(): number{
    var pages = Math.ceil(this.rows / this.rowsPerPage);
    return pages;
  }

  _moveNext(){
    if (this.pages > this.page){
      this.page++;
      this.moveNext.emit(this.page);
      this.pageChange.emit(this.page);
    }
  }

  _movePrevious(){
    if (this.page > 1){
      this.page--;
      this.movePrevious.emit(this.page);
      this.pageChange.emit(this.page);
    }
  }

  nextEnabled(): boolean{
    return (this.pages > this.page);
  }

  previousEnabled(): boolean{
    return (this.page > 1);
  }

  ngOnInit() {
  }

}
