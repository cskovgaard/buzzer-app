import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './host/host.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: '', component: PlayerComponent },
  { path: 'host', component: HostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
