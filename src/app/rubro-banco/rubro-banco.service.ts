import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';
import {Observable} from 'rxjs/Rx';
import { RubroBanco } from './rubro-banco';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class RubroBancoService {

  sortyByField: string;
  entityName: string

  constructor(private af: AngularFire) {
    this.sortyByField = 'rubro_lower';
    this.entityName = 'rubro-banco';
  }

  private getList(query: FirebaseListFactoryOpts = null) : FirebaseListObservable<RubroBanco[]>{
    var list$ = this.af.database.list(this.entityName, query);
    return list$
  }

  findAll() : Observable<RubroBanco[]>{
    var list$ = this.af.database.list(this.entityName);
    return list$.map(RubroBanco.fromJsonArray);
  }

  count() : Observable<number> {
    var list$ = this.af.database.list(this.entityName).map(list => list.length);
    return list$;
  }

  loadPage(pageNumber, rowsPerPage: number, value: string = "", moveNext: boolean) : Observable<RubroBanco[]>{
    var list$;

    if (pageNumber == 1){
      list$ = this.getList( {query: {
                orderByChild: this.sortyByField,
                limitToFirst: rowsPerPage
              }});
    }
    else {
      if (moveNext){
        list$ = this.getList( {query: {
          orderByChild: this.sortyByField,
          startAt: value,
          limitToFirst: rowsPerPage + 1
        }}).map(items => items.slice(1, items.length));
      
      } else {
        list$ = this.getList( {query: {
          orderByChild: this.sortyByField,
          endAt: value,
          limitToLast: rowsPerPage + 1
        }}).map(items => items.slice(0, items.length - 1));
      
      }
    }

    return list$.map(RubroBanco.fromJsonArray);
  }

  add(item: RubroBanco){
    delete item.$key;
    item[this.sortyByField] = item.rubro.toLowerCase();
    this.af.database.list(this.entityName).push(item);
  }

  edit(item: RubroBanco){
    var key = item.$key;
    delete item.$key;
    item.rubro_lower = item.rubro.toLowerCase();
    //var itemToUpload = {rubro: item.rubro, rubro_lower: item.rubro_lower};

    //item[this.sortyByField] = item.rubro.toLowerCase();
    this.af.database.object('/' + this.entityName + '/' + key).update(item);
  }

  delete(key: string){
    this.af.database.list(this.entityName).remove(key);
  }

  getByKey(key: string) : Observable<RubroBanco>{
    var item$ = this.af.database.object('/' + this.entityName + '/' + key).map(RubroBanco.fromJson);

    //var item$ = this.findAll().switchMap(list => list.filter(item => item.$key == key));
    /*var test$ = item$.do(
      x => console.log(x),
      err => console.log(err),
      () => console.log("completed")
    );
    test$.subscribe();*/
    return item$;
  }
}
