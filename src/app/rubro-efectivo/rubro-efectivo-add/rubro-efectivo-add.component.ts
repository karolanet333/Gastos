import { Component, OnInit } from '@angular/core';
import {AbmService} from 'app/abm-helper/abm.service';
import {AbmMapper} from 'app/abm-helper/abm-mapper';
import {Router} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-rubro-efectivo-add',
  templateUrl: './rubro-efectivo-add.component.html',
  styleUrls: ['./rubro-efectivo-add.component.css'],
  providers: [AbmService]
})
export class RubroEfectivoAddComponent implements OnInit {

  abmMapper = new AbmMapper();

  constructor(private abmService: AbmService, private router: Router) { 
    this.abmMapper.initialize('rubro');
    abmService.initialize('rubro-efectivo');
  }

  ngOnInit() {
    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 
    })
  }

  onSubmit(){
    this.abmMapper.add();
    this.abmService.add(this.abmMapper.dbModel);
    
    this.closeModal();
  }

  closeModal(){
    setTimeout(()=>{
      $('#abmPopup .close').click()
      this.router.navigate(['/rubro-efectivo']);
    });
  }

}