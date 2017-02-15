import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {RubroEfectivoService} from '../rubro-efectivo.service';
import {Router} from '@angular/router';
import {RubroEfectivo} from '../rubro-efectivo'
declare var $:any;

@Component({
  selector: 'app-rubro-efectivo-add',
  templateUrl: './rubro-efectivo-add.component.html',
  styleUrls: ['./rubro-efectivo-add.component.css'],
  providers: [RubroEfectivoService]
})
export class RubroEfectivoAddComponent implements OnInit {

  

  item = new RubroEfectivo('', '', '', '');

  constructor(private service: RubroEfectivoService, private router: Router) { 
  }

  ngOnInit() {
    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 
    })
  }

  onSubmit(){
    
    this.service.add(this.item);
    
    this.closeModal();
  }

  closeModal(){
    setTimeout(()=>{
      $("#abmPopup .close").click()
      this.router.navigate(['/rubro-efectivo']);
    });
  }

}
