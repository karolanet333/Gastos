import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {AbmService} from 'app/abm-helper/abm.service';
import {AbmMapper} from 'app/abm-helper/abm-mapper';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
declare var $:any;

@Component({
  selector: 'app-rubro-efectivo-edit',
  templateUrl: './rubro-efectivo-edit.component.html',
  styleUrls: ['./rubro-efectivo-edit.component.css'],
  providers: [AbmService]
})
export class RubroEfectivoEditComponent implements OnInit, OnDestroy {

  abmMapper = new AbmMapper();
  subscription : Subscription;
  id;

  constructor(private abmService: AbmService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.abmMapper.initialize('rubro');
    abmService.initialize('rubro-efectivo');
    this.subscription = activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.abmMapper.editStart(
          this.abmService.getByKey(this.id)
        );
        
      }
    );
  }

  ngOnInit() {
    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(item){
    this.abmMapper.editEnd();
    this.abmService.edit(this.abmMapper.dbModel);
    this.closeModal();
    
  }

  closeModal(){
    setTimeout(()=>{
      $('#abmPopup .close').click()
      this.router.navigate(['/rubro-efectivo']);
    });
  }

}