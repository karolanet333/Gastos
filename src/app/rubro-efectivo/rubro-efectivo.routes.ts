import {Routes} from '@angular/router';

import {RubroEfectivoAddComponent} from './rubro-efectivo-add/rubro-efectivo-add.component';
import {RubroEfectivoEditComponent} from './rubro-efectivo-edit/rubro-efectivo-edit.component';

export const RUBRO_EFECTIVO_ROUTES: Routes = [
    {path: 'add', component: RubroEfectivoAddComponent},
    {path: 'edit/:id', component: RubroEfectivoEditComponent}
];