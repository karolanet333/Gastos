import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';
import {RubroBancoService} from './rubro-banco.service';
import {GeneralConfig} from 'environments/general.configuration';
import {GeneralHelper} from 'app/general-helper';
import {RubroBanco} from './rubro-banco';
declare var $:any;

@Component({
  selector: 'app-rubro-banco',
  templateUrl: './rubro-banco.component.html',
  styleUrls: ['./rubro-banco.component.css'],
  providers: [RubroBancoService]
})
export class RubroBancoComponent implements OnInit, OnDestroy {

  generalConfig = GeneralConfig;
  generalHelper = GeneralHelper;
  itemsCount : number;
  items: RubroBanco[];
  filteredItems: RubroBanco[];

  itemsSubscrip: Subscription;
  searchSubscrip: Subscription;

  constructor(private service: RubroBancoService, private router: Router) {
    
  }

  ngOnInit() {

    var search;

    this.searchSubscrip = Observable.fromEvent($('#search'), 'keyup').subscribe(
      e => {
        console.log(e["target"]["value"]);
        this.filterResults(e["target"]["value"]);
      },
      err => console.log(err)
    );
    
    this.service.count().subscribe(
      count => this.itemsCount = count
    );
    this.loadPage(1);

  }

  filterResults(filter:string=""){
    
      this.filteredItems = GeneralHelper.cloneObjectArray(this.items);
      this.filteredItems = this.filteredItems.filter(
        item => item.rubro_lower.indexOf(filter.toLowerCase()) > -1
      );
      
  }

  loadPage(pageNumber: number, value: string = "", moveNext: boolean = true){
    this.itemsSubscrip = this.service.loadPage(pageNumber, GeneralConfig.rowsPerPage, value, moveNext).subscribe(
      items => {
        
        this.items = items;
        this.filteredItems = GeneralHelper.cloneObjectArray(items);

      }
    );
  }

  delete($key: string){
    this.service.delete($key)
  }

  onMoveNext(page:number){
    var value = "";
    
    if (page > 1){
      value = this.items[this.items.length - 1].rubro_lower;
    }

    this.loadPage(page, value);
  }

  onMovePrevious(page:number){
    var value = "";
    
    value = this.items[0].rubro_lower;
    
    this.loadPage(page, value, false);
  }

  onPageChange(page: number){
    var value = "";
    
    if (page > 1){
      value = this.items[this.items.length - 1].rubro_lower;
    }

    this.loadPage(page, value);
  }

  ngOnDestroy(){
    this.searchSubscrip.unsubscribe();
    this.itemsSubscrip.unsubscribe();
  }

}
