import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VendorAdministrationComponent} from './page/administration/vendor-administration/vendor-administration.component';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {KudosAddComponent} from './kudos-add/kudos-add.component';
import {KudosDashboardComponent} from './kudos-dashboard/kudos-dashboard.component';
import {AuthGuard, AuthGuardSimple} from './_guards';

const routes: Routes = [{path: 'administration/vendor-admin', component: VendorAdministrationComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'kudos-add', component: KudosAddComponent,  canActivate: [AuthGuardSimple]},
  {path: 'kudos-dashboard', component: KudosDashboardComponent, canActivate: [AuthGuardSimple]},
  {path: '', redirectTo: '/login-page', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
