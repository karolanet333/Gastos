import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {RubroEfectivoService} from '../rubro-efectivo.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';
import {RubroEfectivo} from '../rubro-efectivo';
declare var $:any;

@Component({
  selector: 'app-rubro-efectivo-edit',
  templateUrl: './rubro-efectivo-edit.component.html',
  styleUrls: ['./rubro-efectivo-edit.component.css'],
  providers: [RubroEfectivoService]
})
export class RubroEfectivoEditComponent implements OnInit, OnDestroy {

  paramsSubscrip : Subscription;
  getByKeySubscript : Subscription;
  id;
  item : RubroEfectivo;

  constructor(private service: RubroEfectivoService, private activatedRoute: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit() {
    this.paramsSubscrip = this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.getByKeySubscript = this.service.getByKey(this.id).subscribe(
          item => this.item = item
        );
        //this.item = this.getByKey(this.id);
      }
    );

    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 
    });
  }

  ngOnDestroy(){
    this.paramsSubscrip.unsubscribe();
    this.getByKeySubscript.unsubscribe();
  }

  onSubmit(){
    
    this.service.edit(this.item);
    this.closeModal();
    
  }

  closeModal(){
    setTimeout(()=>{
      $("#abmPopup .close").click()
      this.router.navigate(['/rubro-efectivo']);
    });
  }

}
