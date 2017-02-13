import { Injectable } from '@angular/core';
import { AngularFire} from 'angularfire2';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AbmService {

  private entityName: string;

  constructor(private af: AngularFire) { }

  initialize(entityName: string){
    this.entityName = entityName;
  }

  getList(){
    return this.af.database.list(this.entityName);
  }

  //NOT WORKING
  getPaginatedList(page: number, rowsPerPage: number, sortByField: string){

    var v_startAt: number = rowsPerPage * (page - 1) + 1;
    var v_endAt: number = rowsPerPage * page;
    let firstKey = new BehaviorSubject(''); // import 'rxjs/BehaviorSubject'
    let nextKey = new BehaviorSubject('');

    return this.af.database.list('/' + this.entityName, {query: {
        orderByChild: sortByField,
        startAt: 1,
        endAt: 6
      }
    });
  }

  add(item){
    this.getList().push(item);
  }

  edit(item){
    var key = item.$key;
    delete item.$exists;
    delete item.$key;
    this.getList().update(key, item);
  }

  delete(key: string){
    this.getList().remove(key);
  }

  getByKey(key: string){
    var obj = this.af.database.object('/' + this.entityName + '/' + key);
    return obj;
  }

}
