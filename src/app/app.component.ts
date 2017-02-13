import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lstBanco;

  constructor(private af: AngularFire){}

  ngOnInit(){
    this.af.database.list('/banco').subscribe(
      lst => 
      {
        this.lstBanco = lst;
        console.log(this.lstBanco);
      }
    );

  }
}
