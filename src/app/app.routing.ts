import {Routes, RouterModule} from '@angular/router';

import {ResumenComponent} from './resumen/resumen.component';
import {BancoComponent} from './banco/banco.component';
import {EfectivoComponent} from './efectivo/efectivo.component';
import {RubroBancoComponent} from './rubro-banco/rubro-banco.component';
import {RubroEfectivoComponent} from './rubro-efectivo/rubro-efectivo.component';
import {UsuariosAdminComponent} from './usuarios-admin/usuarios-admin.component';
import {RUBRO_BANCO_ROUTES} from './rubro-banco/rubro-banco.routes';
import {RUBRO_EFECTIVO_ROUTES} from './rubro-efectivo/rubro-efectivo.routes';

const APP_ROUTES: Routes = [
    { path: 'banco', component: BancoComponent },
    { path: 'efectivo', component: EfectivoComponent },
    { path: 'rubro-banco', component: RubroBancoComponent},
    { path: 'rubro-banco', component: RubroBancoComponent, children: RUBRO_BANCO_ROUTES},
    { path: 'rubro-efectivo', component: RubroEfectivoComponent, children: RUBRO_EFECTIVO_ROUTES },
    { path: 'resumen', component: ResumenComponent},
    { path: 'usuarios-admin', component: UsuariosAdminComponent},
    { path: '', redirectTo: 'resumen', pathMatch:'full'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
