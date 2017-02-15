import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';
import {Observable, Subscription} from 'rxjs/Rx';
import { SaldoEfectivo } from './saldo-efectivo';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Efectivo} from '../efectivo/efectivo';
import 'rxjs/Rx';

@Injectable()
export class SaldoEfectivoService {

  sortByFieldOrig: string;
  entityName: string
  saldoSubscrip: Subscription;

  constructor(private af: AngularFire) {
    this.sortByFieldOrig = 'saldo';
    this.entityName = 'saldo';
  }

  private getList(query: FirebaseListFactoryOpts = null) {
    var list$ = this.af.database.list(this.entityName, query);
    return list$
  }

  private getObject(key: string, entityName: string){
    return this.af.database.object('/' + entityName + '/' + key);
  }

  loadPage() : Observable<SaldoEfectivo[]>{
    var list$ = this.getList();
    
    return list$.map(SaldoEfectivo.fromJsonArray);
  }


  add(efectivo: Efectivo){
    var saldoKey = 'saldo';
    var efectivoKey: string;
    var saldoTotal: number;
    var monto: number = efectivo.monto;
    var itemSaldo = {
        saldo: 0
    };

    var object = this.getObject(saldoKey, this.entityName);

    this.saldoSubscrip = object.subscribe(
      saldo => {
        //des-subscribir consulta para dejar liberado el recurso
        this.saldoSubscrip.unsubscribe();

        //averiguar el saldo a grabar
        if (efectivo.signo == "-"){
          monto = -efectivo.monto;
        }
        saldoTotal = saldo.saldo + monto;
        itemSaldo.saldo = saldoTotal;

        //grabar el saldo en tabla saldo
        this.getObject(saldoKey, this.entityName).update(itemSaldo);

        //grabar el item en tabla de efectivo
        efectivo.saldo = saldoTotal;
        this.af.database.list("efectivo").push(efectivo);
      }
    );

  }

  
  edit(efectivo: Efectivo, montoAnterior:number, signoAnterior: string){
    var saldoKey = 'saldo';
    var efectivoKey: string;
    var saldoTotal: number;
    var efectivoKey: string;
    var montoNuevo: number = efectivo.monto;
    var itemSaldo = {
        saldo: 0
    };

    var object = this.getObject(saldoKey, this.entityName);

    this.saldoSubscrip = object.subscribe(
      saldo => {
        //des-subscribir consulta para dejar liberado el recurso
        this.saldoSubscrip.unsubscribe();

        //averiguar el saldo a grabar
        if (signoAnterior == "-"){
          montoAnterior = -montoAnterior;
        }
        if (efectivo.signo == "-"){
          montoNuevo = -efectivo.monto;
        }
        saldoTotal = saldo.saldo - montoAnterior + montoNuevo;
        itemSaldo.saldo = saldoTotal;

        //grabar el saldo en tabla saldo
        this.getObject(saldoKey, this.entityName).update(itemSaldo);

        //grabar el item en tabla de efectivo
        efectivo.saldo = saldoTotal;
        efectivoKey = efectivo.$key;
        delete efectivo.$key;
        this.af.database.object('/efectivo/' + efectivoKey).update(efectivo);
      }
    );

  }

}
