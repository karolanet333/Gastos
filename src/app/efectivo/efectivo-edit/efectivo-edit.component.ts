import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {EfectivoService} from '../efectivo.service';
import {RubroEfectivoService} from '../../rubro-efectivo/rubro-efectivo.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';
import {GeneralHelper} from 'app/general-helper';
import {Efectivo} from '../efectivo';
import {RubroEfectivo} from '../../rubro-efectivo/rubro-efectivo';
declare var $:any;

@Component({
  selector: 'app-efectivo-edit',
  templateUrl: './efectivo-edit.component.html',
  styleUrls: ['./efectivo-edit.component.css'],
  providers: [EfectivoService, RubroEfectivoService]
})
export class EfectivoEditComponent implements OnInit, OnDestroy {

  id;
  item : Efectivo;
  sortByFieldOrig: string;
  itemsCombo: RubroEfectivo[];
  itemCombo : RubroEfectivo;
  //strFechaMov: string;

  rubroEfectivoSubscrip: Subscription;
  paramsSubscrip : Subscription;
  getByKeySubscript : Subscription;
  numberSubscrip: Subscription;

  constructor(private service: EfectivoService, private rubroEfectivoService: RubroEfectivoService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.sortByFieldOrig = "efectivo";
  }

  ngOnInit() {
    this.paramsSubscrip = this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.getByKeySubscript = this.service.getByKey(this.id).subscribe(
          item => {
            this.item = item;

            this.rubroEfectivoSubscrip = this.rubroEfectivoService.loadPage().subscribe(
              itemsCombo => {
                this.itemsCombo = itemsCombo;
                this.itemCombo = Object.assign({}, itemsCombo.find(x => x.$key == item.rubro));
              } 
            );
            //this.strFechaMov = GeneralHelper.getStrDate(item.fechaMov);
          }
        );
        //this.item = this.getByKey(this.id);
      }
    );

    

    this.numberSubscrip = Observable.fromEvent($('#monto'), 'blur').subscribe(
      e => {
        console.log(e["target"]["value"]);
        e["target"]["value"] = e["target"]["value"].replace(",", ".");
      }
    );

    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 
    });
  }

  ngOnDestroy(){
    this.paramsSubscrip.unsubscribe();
    this.getByKeySubscript.unsubscribe();
    this.numberSubscrip.unsubscribe();
    this.rubroEfectivoSubscrip.unsubscribe();
  }

  onSubmit(){
    //this.item.fechaMov = GeneralHelper.getDateFromStr(this.strFechaMov);
    var itemCombo: RubroEfectivo = this.itemsCombo.find(x => x.rubro == this.item.rubro);
    this.item.signo = itemCombo.signo;
    this.service.edit(this.item);
    this.closeModal();
    
  }

  closeModal(){
    setTimeout(()=>{
      $("#abmPopup .close").click()
      this.router.navigate(['/efectivo']);
    });
  }

}
