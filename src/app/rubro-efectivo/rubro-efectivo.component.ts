import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AbmMapper} from 'app/abm-helper/abm-mapper';
import {AbmService} from 'app/abm-helper/abm.service';
declare var $:any;

@Component({
  selector: 'app-rubro-efectivo',
  templateUrl: './rubro-efectivo.component.html',
  styleUrls: ['./rubro-efectivo.component.css'],
  providers: [AbmService]
})
export class RubroEfectivoComponent implements OnInit {

  abmMapper = new AbmMapper();

  constructor(private abmService: AbmService, private router: Router) {
    this.abmMapper.initialize('rubro');
    abmService.initialize('rubro-efectivo');
  }

  ngOnInit() {
    this.abmMapper.list(
      this.abmService.getList()
    );
  }

  delete(id){
    this.abmService.delete(id)
  }


}