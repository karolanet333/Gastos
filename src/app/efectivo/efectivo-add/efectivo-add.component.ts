import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import {EfectivoService} from '../efectivo.service';
import {RubroEfectivoService} from '../../rubro-efectivo/rubro-efectivo.service';
import {Router} from '@angular/router';
import {Efectivo} from '../efectivo'
import {GeneralHelper} from 'app/general-helper';
import {Observable, Subscription} from 'rxjs/Rx';
import {RubroEfectivo} from '../../rubro-efectivo/rubro-efectivo';
declare var $:any;

@Component({
  selector: 'app-efectivo-add',
  templateUrl: './efectivo-add.component.html',
  styleUrls: ['./efectivo-add.component.css'],
  providers: [EfectivoService, RubroEfectivoService]
})
export class EfectivoAddComponent implements OnInit, OnDestroy {

  sortByFieldOrig: string;
  sDate: string
  item: Efectivo;
  itemsCombo : RubroEfectivo[];

  rubroEfectivoSubscrip: Subscription;
  numberSubscrip: Subscription;

  constructor(private service: EfectivoService, private rubroEfectivoService: RubroEfectivoService, private router: Router) { 
    this.sortByFieldOrig = "efectivo";
    this.sDate = GeneralHelper.getStrDate(new Date());
    this.item = new Efectivo('', '', '', this.sDate, this.sDate, 0, '+', 0);
  }

  ngOnInit() {

    this.rubroEfectivoSubscrip = this.rubroEfectivoService.loadPage().subscribe(
      items => this.itemsCombo = items
    );

    this.numberSubscrip = Observable.fromEvent($('#monto'), 'blur').subscribe(
      e => {
        console.log(e["target"]["value"]);
        e["target"]["value"] = e["target"]["value"].replace(",", ".");
      }
    );

    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 

    })
  }

  onSubmit(){
    var itemCombo: RubroEfectivo = this.itemsCombo.find(x => x.rubro == this.item.rubro);
    this.item.signo = itemCombo.signo;
    this.service.add(this.item);
    this.closeModal();
  }

  closeModal(){
    setTimeout(()=>{
      $("#abmPopup .close").click()
      this.router.navigate(['/efectivo']);
    });
  }

  ngOnDestroy(){
    this.rubroEfectivoSubscrip.unsubscribe();
  }

}
