import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {RubroBancoService} from '../rubro-banco.service';
import {Router} from '@angular/router';
import {RubroBanco} from '../rubro-banco'
declare var $:any;

@Component({
  selector: 'app-rubro-banco-add',
  templateUrl: './rubro-banco-add.component.html',
  styleUrls: ['./rubro-banco-add.component.css'],
  providers: [RubroBancoService]
})
export class RubroBancoAddComponent implements OnInit {

  

  item = new RubroBanco('', '', '');

  constructor(private service: RubroBancoService, private router: Router) { 
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
      this.router.navigate(['/rubro-banco']);
    });
  }

}
