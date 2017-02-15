import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';
import {EfectivoService} from './efectivo.service';
import {SaldoEfectivoService} from '../saldo-efectivo/saldo-efectivo.service';
import {GeneralConfig} from 'environments/general.configuration';
import {GeneralHelper} from 'app/general-helper';
import {Efectivo} from './efectivo';
declare var $:any;

@Component({
  selector: 'app-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.css'],
  providers: [EfectivoService, SaldoEfectivoService]
})
export class EfectivoComponent implements OnInit, OnDestroy {

  generalConfig = GeneralConfig;
  generalHelper = GeneralHelper;
  itemsCount : number;
  items: Efectivo[];
  filteredItems: Efectivo[];
  sortByField: string;
  sortByFieldOrig: string;

  itemsSubscrip: Subscription;
  searchSubscrip: Subscription;

  constructor(private service: EfectivoService, private router: Router) {
    this.sortByField = "efectivo_lower";
    this.sortByFieldOrig = "efectivo";
  }

  ngOnInit() {

    var search;

    //search
    this.searchSubscrip = Observable.fromEvent($('#search'), 'keyup').subscribe(
      e => {
        console.log(e["target"]["value"]);
        this.filterResults(e["target"]["value"]);
      },
      err => console.log(err)
    );
    
    this.loadPage();
    
  }

  filterResults(filter:string=""){
    
      this.filteredItems = GeneralHelper.cloneObjectArray(this.items);
      this.filteredItems = this.filteredItems.filter(
        item => item[this.sortByField].indexOf(filter.toLowerCase()) > -1
      );
      
  }

  loadPage(){
    this.itemsSubscrip = this.service.loadPage().subscribe(
      items => {
        
        this.items = items;
        this.filteredItems = GeneralHelper.cloneObjectArray(items);

      }
    );
  }

  delete($key: string){
    this.service.delete($key)
  }


  ngOnDestroy(){
    this.searchSubscrip.unsubscribe();
    this.itemsSubscrip.unsubscribe();
  }

}
