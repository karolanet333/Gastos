import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';
import {Observable} from 'rxjs/Rx';
import { Efectivo } from './efectivo';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SaldoEfectivoService} from '../saldo-efectivo/saldo-efectivo.service';
import 'rxjs/Rx';

@Injectable()
export class EfectivoService {

  sortByField: string;
  sortByFieldOrig: string;
  entityName: string
  

  constructor(private af: AngularFire, private saldoEfectivoService: SaldoEfectivoService) {
    this.sortByField = 'fechaMov';
    this.sortByFieldOrig = 'efectivo';
    this.entityName = 'efectivo';
  }

  private getList(query: FirebaseListFactoryOpts = null) {
    var list$ = this.af.database.list(this.entityName, query);
    return list$
  }

  private getObject(key: string){
    return this.af.database.object('/' + this.entityName + '/' + key);
  }

  loadPage() : Observable<Efectivo[]>{
    var list$ = this.getList( {query: {
                orderByChild: this.sortByField
              }});
    
    return list$.map(Efectivo.fromJsonArray);
  }

  add(item: Efectivo){
    //eliminar key
    delete item.$key;

    //grabar en tabla de saldos
    //también agrega el item
    this.saldoEfectivoService.add(item);

  }

  edit(item: Efectivo){
    var key = item.$key;
    delete item.$key;
    //item[this.sortByField] = item[this.sortByFieldOrig].toLowerCase();
    this.getObject(key).update(item);
  }

  delete(key: string){
    this.af.database.list(this.entityName).remove(key);
  }

  getByKey(key: string) : Observable<Efectivo>{
    var item$ = this.getObject(key).map(Efectivo.fromJson);
    return item$;
  }
}
