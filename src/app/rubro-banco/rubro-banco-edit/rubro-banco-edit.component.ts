import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {RubroBancoService} from '../rubro-banco.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';
import {RubroBanco} from '../rubro-banco';
declare var $:any;

@Component({
  selector: 'app-rubro-banco-edit',
  templateUrl: './rubro-banco-edit.component.html',
  styleUrls: ['./rubro-banco-edit.component.css'],
  providers: [RubroBancoService]
})
export class RubroBancoEditComponent implements OnInit, OnDestroy {

  paramsSubscrip : Subscription;
  getByKeySubscript : Subscription;
  id;
  item : RubroBanco;

  constructor(private service: RubroBancoService, private activatedRoute: ActivatedRoute, private router: Router) {
    
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

  /*private getByKey(key: string) : RubroBanco{
    var item$ = this.service.getByKey(key);
    var rpta : RubroBanco;
    this.getByKeySubscript = item$.subscribe(
      item => rpta = item
    );
    return rpta;
  }*/

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
      this.router.navigate(['/rubro-banco']);
    });
  }

}
