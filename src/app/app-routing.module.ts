import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VendorAdministrationComponent} from './page/administration/vendor-administration/vendor-administration.component';
import {NotFoundComponent} from './page/not-found/not-found.component';

const routes: Routes = [{path: 'administration/vendor-admin', component: VendorAdministrationComponent},
  {path: '', redirectTo: '/administration/vendor-admin', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
