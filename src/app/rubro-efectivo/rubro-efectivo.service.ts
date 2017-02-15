import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';
import {Observable} from 'rxjs/Rx';
import { RubroEfectivo } from './rubro-efectivo';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class RubroEfectivoService {

  sortyByField: string;
  entityName: string

  constructor(private af: AngularFire) {
    this.sortyByField = 'rubro_lower';
    this.entityName = 'rubro-efectivo';
  }

  private getList(query: FirebaseListFactoryOpts = null) {
    var list$ = this.af.database.list(this.entityName, query);
    return list$
  }

  private getObject(key: string){
    return this.af.database.object('/' + this.entityName + '/' + key);
  }

  loadPage() : Observable<RubroEfectivo[]>{
    var list$ = this.getList( {query: {
                orderByChild: this.sortyByField
              }});
    
    return list$.map(RubroEfectivo.fromJsonArray);
  }

  add(item: RubroEfectivo){
    delete item.$key;
    item[this.sortyByField] = item.rubro.toLowerCase();
    this.af.database.list(this.entityName).push(item);
  }

  edit(item: RubroEfectivo){
    var key = item.$key;
    delete item.$key;
    item.rubro_lower = item.rubro.toLowerCase();
    this.getObject(key).update(item);
  }

  delete(key: string){
    this.af.database.list(this.entityName).remove(key);
  }

  getByKey(key: string) : Observable<RubroEfectivo>{
    var item$ = this.getObject(key).map(RubroEfectivo.fromJson);
    return item$;
  }
}
