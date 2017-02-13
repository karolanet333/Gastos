import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import {routing} from './app.routing';



import { AppComponent } from './app.component';
import { RubroBancoComponent } from './rubro-banco/rubro-banco.component';
import { RubroEfectivoComponent } from './rubro-efectivo/rubro-efectivo.component';
import { BancoComponent } from './banco/banco.component';
import { EfectivoComponent } from './efectivo/efectivo.component';
import { ResumenComponent } from './resumen/resumen.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { RubroBancoAddComponent } from './rubro-banco/rubro-banco-add/rubro-banco-add.component';
import { RubroBancoEditComponent } from './rubro-banco/rubro-banco-edit/rubro-banco-edit.component';
import { RubroEfectivoAddComponent } from './rubro-efectivo/rubro-efectivo-add/rubro-efectivo-add.component';
import { RubroEfectivoEditComponent } from './rubro-efectivo/rubro-efectivo-edit/rubro-efectivo-edit.component';
import { PaginatorComponent } from './abm-helper/paginator/paginator.component';


@NgModule({
  declarations: [
    AppComponent,
    RubroBancoComponent,
    RubroEfectivoComponent,
    BancoComponent,
    EfectivoComponent,
    ResumenComponent,
    UsuariosAdminComponent,
    RubroBancoAddComponent,
    RubroBancoEditComponent,
    RubroEfectivoAddComponent,
    RubroEfectivoEditComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
