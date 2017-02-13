import {Routes} from '@angular/router';

import {RubroBancoAddComponent} from './rubro-banco-add/rubro-banco-add.component'; 
import {RubroBancoEditComponent} from './rubro-banco-edit/rubro-banco-edit.component';

export const RUBRO_BANCO_ROUTES: Routes = [
    {path: 'add', component: RubroBancoAddComponent},
    {path: 'edit/:id', component: RubroBancoEditComponent}
];