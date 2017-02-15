import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';
import {RubroEfectivoService} from './rubro-efectivo.service';
import {GeneralConfig} from 'environments/general.configuration';
import {GeneralHelper} from 'app/general-helper';
import {RubroEfectivo} from './rubro-efectivo';
declare var $:any;

@Component({
  selector: 'app-rubro-efectivo',
  templateUrl: './rubro-efectivo.component.html',
  styleUrls: ['./rubro-efectivo.component.css'],
  providers: [RubroEfectivoService]
})
export class RubroEfectivoComponent implements OnInit, OnDestroy {

  generalConfig = GeneralConfig;
  generalHelper = GeneralHelper;
  itemsCount : number;
  items: RubroEfectivo[];
  filteredItems: RubroEfectivo[];

  itemsSubscrip: Subscription;
  searchSubscrip: Subscription;

  constructor(private service: RubroEfectivoService, private router: Router) {
    
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
        item => item.rubro_lower.indexOf(filter.toLowerCase()) > -1
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
